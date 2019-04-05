import React, { Component } from 'react'
import '../styles/components/container.scss'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import PersonDetail from './person-detail/PersonDetail'
import  manager from '../js/person-manager'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            people: [],
            headerTitle: 'All',
            selectedPersonId: ''
        }
    }
    async componentDidMount() {
        const people = await manager.loadPeople()
        this.setState({ people })

        manager.on(manager.UPDATE_IDB_EVENT, this.initPeople)
        manager.on(manager.UPDATE_FILTERS_EVENT, this.initPeopleAndHeaderTitle)
    }
    initPeople = ({ people }) => {
        this.setState({ people })
    }
    initPeopleAndHeaderTitle = ({ people, filter }) => {
        const headerTitle = filter.month || 'All'
        this.setState({ people, headerTitle })
    }
    setSelectedPersonId = (selectedPersonId) => {
        this.setState({ selectedPersonId })
    }
    findSelectedPerson() {
        const { people, selectedPersonId } = this.state
        if (!people || !selectedPersonId) return 

        return people.find(p => p.id === selectedPersonId)
    }
    render() {
        const selectedPerson = this.findSelectedPerson()
        return (
            <div className='container'>
                {selectedPerson && 
                    <PersonDetail 
                        person={selectedPerson}
                        setSelectedPersonId={this.setSelectedPersonId}/>
                }

                {!selectedPerson &&
                    <Header title={this.state.headerTitle}/>
                }
                {!selectedPerson &&
                    <Body 
                        people={this.state.people}
                        setSelectedPersonId={this.setSelectedPersonId} />
                }
                {!selectedPerson &&
                    <Footer />
                } 
            </div>
        )
    }
}

export default Container