import React, { Component } from 'react'
import '../styles/components/container.scss'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import  manager from '../js/person-manager'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            people: [],
            headerTitle: 'All'
        }
    }
    async componentDidMount() {
        const people = await manager.loadPeople()
        this.setState({ people })

        manager.on(manager.UPDATE_IDB_EVENT, this.initPeople)
        manager.on(manager.UPDATE_FILTERS_EVENT, this.initPeopleAndHeaderTitle)
    }
    initPeople = ({ people }) => {
        console.log('init People', people)
        this.setState({ people })
    }
    initPeopleAndHeaderTitle = ({ people, filter }) => {
        const headerTitle = filter.month || 'All'
        this.setState({ people, headerTitle })
    }
    render() {
        return (
            <div className='container'>
                <Header title={this.state.headerTitle}/>
                <Body people={this.state.people} />
                <Footer />
            </div>
        )
    }
}

export default Container