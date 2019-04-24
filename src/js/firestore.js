import firebase from 'firebase/app'
import manager from './person-manager'


const attachAuthId = (data) => {
    const user = firebase.auth().currentUser
    if (!user) throw new Error('User is not signed in.')

    data.authId = user.uid
}

const uploadAllPeopleToFirestore = async () => {
    const people = await manager.loadPeople()
    if (!people) throw new Error('Fail to load people data.')

    const user = firebase.auth().currentUser
    if (!user) throw new Error('User is not signed in.')

    const batch = firebase.firestore().batch()    
    people.forEach(person => {
        const personRef = firebase.firestore().collection('people').doc(person.id)
        const authId = user.uid
        const { id, month, date, name, memos, createdAt, updatedAt } = person
        batch.set(personRef, { id, month, date, name, authId, createdAt, updatedAt })

        if (!memos) return 
        memos.forEach(memo => {
            batch.set(personRef.collection('memos').doc(memo.id), memo)
        })
    })

    await batch.commit()
}

const syncDataFromFirestore = async () => {
    const user = firebase.auth().currentUser
    if (!user) return 

    const query = firebase.firestore().collection('people').where('authId', '==', user.uid)
    const querySnapshot = await query.get()
    querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
    })
}

const createPersonInFirestore = async (person) => {
    attachAuthId(person)
    const personRef = firebase.firestore().collection('people').doc(person.id)
    await personRef.set(person)
}

const updatePersonInFirestore = async (person) => {
    const personRef = firebase.firestore().collection('people').doc(person.id)
    const personCopy = {...person}
    delete personCopy.memos
    await personRef.update(person)
}
 
const deletePersonInFirestore = async (person) => {
    const db = firebase.firestore()
    const personRef = db.collection('people').doc(person.id)
    const batch = db.batch()    

    batch.delete(personRef)
    person.memos.forEach(({ id }) => batch.delete(personRef.collection('memos').doc(id)) )

    await batch.commit()
}

const createMemoInFirestore = async (personId, memo) => {
    attachAuthId(memo)
    const memoRef = firebase.firestore().collection('people').doc(personId).collection('memos').doc(memo.id)
    await memoRef.set(memo)
}

const updateMemoInFirestore = async (personId, memo) => {
    const memoRef = firebase.firestore().collection('people').doc(personId).collection('memos').doc(memo.id)
    await memoRef.update(memo)
}

const deleteMemoInFirestore = async (personId, memo) => {
    const memoRef = firebase.firestore().collection('people').doc(personId).collection('memos').doc(memo.id)
    await memoRef.delete()
}

export { 
    uploadAllPeopleToFirestore,
    createPersonInFirestore, 
    updatePersonInFirestore, 
    deletePersonInFirestore,
    createMemoInFirestore,
    updateMemoInFirestore,
    deleteMemoInFirestore,
    syncDataFromFirestore
}