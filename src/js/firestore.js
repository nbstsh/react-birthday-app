import firebase from 'firebase/app'
import manager from './person-manager'


const attachOwner = (data) => {
    const user = firebase.auth().currentUser
    if (!user) throw new Error('User is not signed in.')

    data.owner = user.uid
}

const uploadAllPeople = async () => {
    const people = await manager.loadPeople()
    if (!people) throw new Error('Fail to load people data.')

    const user = firebase.auth().currentUser
    if (!user) throw new Error('User is not signed in.')

    const batch = firebase.firestore().batch()    
    people.forEach(person => {
        const personRef = firebase.firestore().collection('people').doc(person.id)
        person.owner = user.uid
        const { id, month, date, name, memos, createdAt, updatedAt } = person
        batch.set(personRef, { id, month, date, name, createdAt, updatedAt })

        if (!memos) return 
        memos.forEach(memo => {
            batch.set(personRef.collection('memos').doc(memo.id), memo)
        })
    })

    await batch.commit()
}

const createPersonInFirestore = async (person) => {
    attachOwner(person)
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
    attachOwner(memo)
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
    uploadAllPeople,
    createPersonInFirestore, 
    updatePersonInFirestore, 
    deletePersonInFirestore,
    createMemoInFirestore,
    updateMemoInFirestore,
    deleteMemoInFirestore
}