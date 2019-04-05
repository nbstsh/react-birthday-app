import uuidv4 from 'uuidv4'
import moment from 'moment'
import createIdbKeyval from './idb-keyval'
import EventEmitter from 'events'
import { setFilters, getFilters } from './filters'
const idbKeyval = createIdbKeyval('people')


// if there is an update in IndexedDB, PersonManager emit an event ('updateIdb' event)
class PersonManager extends EventEmitter {
    constructor() {
        super()
        this.people = []
        this.UPDATE_IDB_EVENT = 'updateIdb'
        this.UPDATE_FILTERS_EVENT = 'updateFilters'
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

        this.people.push(person)
        await await idbKeyval.set(id, person)

        this.emit(this.UPDATE_IDB_EVENT, { people: this.getFilteredPeople() })

        return person
    }
    async updatePerson({ id,  month, date, name, memos }) {
        const person = this.people.find((person) => person.id === id)
        if (!person) return 

        const isValidMonth = typeof month === 'number' && month > 0 && month <= 12
        const isValidDate = typeof month === 'number' && date > 0 && date <= 31
        const isValidName = typeof name === 'string'
        const isValidMemos = typeof memos === 'array'
    
        if (isValidMonth) person.month = month
        if (isValidDate) person.date = date
        if (isValidName) person.name = name
        if (isValidMemos) person.memos = memos

        if (isValidMonth || isValidDate || isValidName || isValidMemos) 
            person.updatedAt = moment().valueOf()
        
        await idbKeyval.set(person.id, person)

        this.emit(this.UPDATE_IDB_EVENT, { people: this.getFilteredPeople() })
    }
    async removePerson(id) {
        const index = this.people.findIndex((person) => person.id === id)
        
        if (index > -1) {
            const personArray = this.people.splice(index, 1)
            await idbKeyval.delete(personArray[0].id)

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
    createMemo(personId, memoContent) {
        const person = this.people.find(p => p.id === personId)
        if (!person) return 

        person.memos.push({
            id: uuidv4(),
            content: memoContent
        })

        this.updatePerson(person)
    }
    updateMemo(personId, { id, content }) {
        const person = this.people.find(p => p.id === personId)
        if (!person) return 

        const memo = person.memos.find(m => m.id === id)
        if (!memo) return 

        memo.content = content 

        this.updatePerson(person)
    }
    deleteMemo(personId, memoId) {
        const person = this.people.find(p => p.id === personId)
        if (!person) return 

        const index = person.memos.findIndex(m => m.id === memoId)
        if (index === -1) return 

        person.memos.splice(index, 1)
        
        this.updatePerson(person)
    }
}

const manager = new PersonManager()

export default manager