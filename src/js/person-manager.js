import uuidv4 from 'uuidv4'
import moment from 'moment'
import createIdbKeyval from './idb-keyval'
import EventEmitter from 'events'
const idbKeyval = createIdbKeyval('people')


// if there is an update in IndexedDB, PersonManager emit an event ('updateIdb' event)
class PersonManager extends EventEmitter {
    constructor() {
        super()
        this.people = []
        this.UPDATE_IDB_EVENT = 'updateIdb'
    }
    getPeople() {
        return this.people
    }
    // return promise which resolve an array which contains loaded person objects from IndexedDB
    async loadPeople() {
        const keys = await idbKeyval.keys()
        this.people  = await Promise.all(keys.map(key => idbKeyval.get(key)))
        
        // array is sorted by month/date
        this.sortByDate()

        return Promise.resolve(this.people)
    }
    async resetPeople() {
        this.people = []
        await idbKeyval.clear()
        this.emit(this.UPDATE_IDB_EVENT, { people: this.people })
    }
    async createPerson({ month, date, name, memos = [] }) {
        const id = uuidv4()
        const person = {
            id,
            month, // Number
            date, // Number
            name, // String 
            memos,
            createdAt: moment().valueOf(),
            updatedAt: moment().valueOf()
        }

        this.people.push(person)
        await await idbKeyval.set(id, person)

        this.emit(this.UPDATE_IDB_EVENT, { people: this.people })

        return person
    }
    async updatePerson({ id,  month, date, name }) {
        const person = this.people.find((person) => person.id === id)
        if (!person) return 
    
        if (typeof month === 'number' && month > 0 && month <= 12)
            person.month = month
    
        if (typeof month === 'number' && date > 0 && date <= 31)
            person.date = date
    
        if (typeof name === 'string')
            person.name = name
        
        await idbKeyval.set(person.id, person)

        this.emit(this.UPDATE_IDB_EVENT, { people: this.people })
    }
    async removePerson(id) {
        const index = this.people.findIndex((person) => person.id === id)
        
        if (index > -1) {
            const personArray = this.people.splice(index, 1)
            await idbKeyval.delete(personArray[0].id)

            this.emit(this.UPDATE_IDB_EVENT, { people: this.people })
        }
    }
    sortByDate() {
        this.people.sort((a, b) => {
            if (a.month > b.month) return 1
            if (a.month < b.month) return -1 
    
            // same month 
            if (a.date > b.date) return 1
            if (a.date < b.date) return -1
    
            return 0
        })
    }
    getSortedPeople(){
        this.sortByDate()
        return this.people
    }
}

const manager = new PersonManager()

export default manager