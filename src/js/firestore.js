import firebase from 'firebase/app'
import manager from './person-manager'


const attachAuthId = (data) => {
    const user = firebase.auth().currentUser
    if (!user) throw new Error('User is not signed in.')

    data.authId = user.uid
}

const generateCopyWithAuthId = (obj = {}) => {
    const copy = { ...obj }
    attachAuthId(copy)
    return copy
}

const uploadAllPeopleToFirestore = async () => {
    const people = await manager.loadPeople()
    if (!people) throw new Error('Fail to load people data.')

    const user = firebase.auth().currentUser
    if (!user) throw new Error('User is not signed in.')

    const batch = firebase.firestore().batch()    
    people.forEach(person => {
        const personRef = firebase.firestore().collection('people').doc(person.id)
        const personCopy = generateCopyWithAuthId(person)
        delete personCopy.memos
        batch.set(personRef, personCopy)

        if (!person.memos) return 
        person.memos.forEach(memo => {
            const memoCopy = generateCopyWithAuthId(memo)
            batch.set(personRef.collection('memos').doc(memo.id), memoCopy)
        })
    })

    await batch.commit()
}

const syncDataFromFirestore = async () => {
    const user = firebase.auth().currentUser
    if (!user) return 

    const people = await manager.loadPeople()

    const peopleRef = firebase.firestore().collection('people')
    const querySnapshot = await peopleRef.where('authId', '==', user.uid).get()
    const savePromises = querySnapshot.docs.map(personDoc => {
        const personToSave = personDoc.data()

        return peopleRef.doc(personToSave.id).collection('memos').get()
            .then(memoQuerySnapshot => {
                // populate memos if necessary
                if (memoQuerySnapshot.size > 0) {
                    personToSave.memos = []
                    memoQuerySnapshot.forEach(memoDoc => personToSave.memos.push(memoDoc.data()) )
                }
                // check if update is needed
                const person = people.find(p => p.id === personToSave.id)
                const needSave = !person || personToSave.updatedAt > person.updatedAt
                return needSave ? manager.savePersonInIdb(personToSave.id, personToSave) : null
            })
    })

    await Promise.all(savePromises)
}

const createPersonInFirestore = async (person) => {
    const personCopy = generateCopyWithAuthId(person)
    delete personCopy.memos
    const personRef = firebase.firestore().collection('people').doc(person.id)
    await personRef.set(personCopy)
}

const updatePersonInFirestore = async (person) => {
    const personCopy = generateCopyWithAuthId(person)
    delete personCopy.memos
    const personRef = firebase.firestore().collection('people').doc(person.id)
    await personRef.update(personCopy)
}
 
const deletePersonInFirestore = async (person) => {
    const db = firebase.firestore()
    const personRef = db.collection('people').doc(person.id)
    const batch = db.batch()    

    batch.delete(personRef)
    if (person.memos) {
        person.memos.forEach(({ id }) => batch.delete(personRef.collection('memos').doc(id)))
    }

    await batch.commit()
}

const setMemoInFirestore = async (personId, memo) => {
    const memoCopy = generateCopyWithAuthId(memo)
    const memoRef = firebase.firestore().collection('people').doc(personId).collection('memos').doc(memo.id)
    await memoRef.set(memoCopy)
}

const updateMemoInFirestore = async (personId, memo) => {
    const memoCopy = generateCopyWithAuthId(memo)
    const memoRef = firebase.firestore().collection('people').doc(personId).collection('memos').doc(memo.id)
    await memoRef.update(memoCopy)
}

const deleteMemoInFirestore = async (personId, memo) => {
    const memoRef = firebase.firestore().collection('people').doc(personId).collection('memos').doc(memo.id)
    await memoRef.delete()
}

const deleteAllPeopleInFirestore = async () => {
    try {
        const people = await manager.loadPeople()
        if (!people) throw new Error('Fail to load people data.')
    
        await Promise.all(people.map(person => deletePersonInFirestore(person)))

    }
    catch (e) {
        await addErrorLog({ 
            authId: firebase.auth().currentUser.uid,
            errorMessage: e.message
        })
    }
}

const addErrorLog = async (log) => {
    const logsRef = firebase.firestore().collection('logs')
    logsRef.add(log)
}

export { 
    uploadAllPeopleToFirestore,
    createPersonInFirestore, 
    updatePersonInFirestore, 
    deletePersonInFirestore,
    setMemoInFirestore,
    updateMemoInFirestore,
    deleteMemoInFirestore,
    syncDataFromFirestore,
    deleteAllPeopleInFirestore
}