import uuidv4 from 'uuidv4'
import moment from 'moment'
import createIdbKeyval from './idb-keyval'
import EventEmitter from 'events'
import { setFilters, getFilters } from './filters'
import { createPersonInFirestore, updatePersonInFirestore, 
        deletePersonInFirestore, setMemoInFirestore, deleteMemoInFirestore } from './firestore'
const idbKeyval = createIdbKeyval('people')


// if there is an update in IndexedDB, PersonManager emit an event ('updateIdb' event)
class PersonManager extends EventEmitter {
    constructor() {
        super()
        this.people = []
        this.UPDATE_IDB_EVENT = 'updateIdb'
        this.UPDATE_FILTERS_EVENT = 'updateFilters'
        this.isSinedin = false
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

        return this.people
    }
    async resetPeople() {
        this.people = []
        await idbKeyval.clear()
        this.emit(this.UPDATE_IDB_EVENT, { people: this.getFilteredPeople() })
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

        if (this.isSinedin) {
            await createPersonInFirestore(person)
        }

        this.people.push(person)
        await this.savePersonInIdb(id, person)

        this.emit(this.UPDATE_IDB_EVENT, { people: this.getFilteredPeople() })

        return person
    }
    async updatePerson({ id,  month, date, name, memos }) {
        const person = this.people.find((person) => person.id === id)
        if (!person) return 

        const isValidMonth = typeof month === 'number' && month > 0 && month <= 12
        const isValidDate = typeof month === 'number' && date > 0 && date <= 31
        const isValidName = typeof name === 'string'
        const isValidMemos = Array.isArray(memos)
    
        if (isValidMonth) person.month = month
        if (isValidDate) person.date = date
        if (isValidName) person.name = name
        if (isValidMemos) person.memos = memos

        if (isValidMonth || isValidDate || isValidName || isValidMemos) 
            person.updatedAt = moment().valueOf()
        

        if (this.isSinedin) {
            await updatePersonInFirestore(person)
        }

        await this.savePersonInIdb(person.id, person)

        this.emit(this.UPDATE_IDB_EVENT, { people: this.getFilteredPeople() })
    }
    async removePerson(id) {
        const index = this.people.findIndex((person) => person.id === id)
        
        if (index > -1) {
            if (this.isSinedin) {
                await deletePersonInFirestore(this.people[index])
            }
            const personToDelete = this.people.splice(index, 1)[0]
            await this.deletePersonInIdb(personToDelete.id)

            this.emit(this.UPDATE_IDB_EVENT, { people: this.getFilteredPeople() })
        }
    }
    sortByDate() {
        this.people.sort((a, b) => {
            if (a.month > b.month) return 1
            if (a.month < b.month) return -1 
    
            // if it's same month, sort by date
            if (a.date > b.date) return 1
            if (a.date < b.date) return -1
    
            return 0
        })
    }
    getSortedPeople() {
        this.sortByDate()
        return this.people
    }
    getFilteredPeople() {
        const filter = getFilters()
        this.sortByDate()
        return this.people.filter(({ month, date, name }) => {
            const isValidMonth = !filter.month || month === filter.month
            const isValidDate = !filter.date || date === filter.date 
            const isValidName = name.toLowerCase().includes(filter.name)
            
            return isValidMonth && isValidDate && isValidName
        })
    }
    setFilters(filters) {
        setFilters(filters)

        this.emit(this.UPDATE_FILTERS_EVENT, { 
            people: this.getFilteredPeople(),
            filter: getFilters()
        })
    }
    async createMemo(personId, memoContent) {
        const person = this.people.find(p => p.id === personId)
        if (!person) return 

        const memo = {
            id: uuidv4(),
            content: memoContent
        }

        if (this.isSinedin) {
            await setMemoInFirestore(person.id, memo)
        }

        if (person.memos) {
            person.memos.push(memo)
        } else {
            person.memos = [memo]
        }

        person.updatedAt = moment().valueOf()
        this.savePersonInIdb(person.id, person)
        this.emit(this.UPDATE_IDB_EVENT, { people: this.getFilteredPeople() })
    }
    async updateMemo(personId, { id, content }) {
        const person = this.people.find(p => p.id === personId)
        if (!person) return 

        const memo = person.memos.find(m => m.id === id)
        if (!memo) return 

        memo.content = content 

        if (this.isSinedin) {
            await setMemoInFirestore(person.id, memo)
        }

        person.updatedAt = moment().valueOf()
        this.savePersonInIdb(person.id, person)
        this.emit(this.UPDATE_IDB_EVENT, { people: this.getFilteredPeople() })
    }
    async deleteMemo(personId, memoId) {
        const person = this.people.find(p => p.id === personId)
        if (!person) return 

        const index = person.memos.findIndex(m => m.id === memoId)
        if (index === -1) return 

        if (this.isSinedin) {
            await deleteMemoInFirestore(person.id, person.memos[index])
        }

        person.memos.splice(index, 1)
        
        this.updatePerson(person)
    }
    async savePersonInIdb(id, person) {
        await idbKeyval.set(id, person)
    }
    async deletePersonInIdb(id) {
        await idbKeyval.delete(id)
    }
}

const manager = new PersonManager()

export default manager