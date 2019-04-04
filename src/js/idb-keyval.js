import { openDB } from 'idb'

const DB_NAME = 'birthday-app'
const OBJECT_STORE_NAME = 'people'


const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(OBJECT_STORE_NAME)
    }
})

const createIdbKeyval = (objectStoreName) => ({
    async get(key) {
        return (await dbPromise).get(objectStoreName, key)
    },
    async set(key, val) {
        return (await dbPromise).put(objectStoreName, val, key)
    },
    async delete(key) {
        return (await dbPromise).delete(objectStoreName, key)
    },
    async clear() {
        return (await dbPromise).clear(objectStoreName)
    },
    async keys() {
        return (await dbPromise).getAllKeys(objectStoreName)
    },
})


export default createIdbKeyval