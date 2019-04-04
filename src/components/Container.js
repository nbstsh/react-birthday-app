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
            people: []
        }
    }
    async componentDidMount() {
        this.initPeople()

        manager.on(manager.UPDATE_IDB_EVENT, this.initPeople)
    }
    initPeople = async () => {
        const people = await manager.loadPeople()
        this.setState({ people })

        // TEST
        console.log('init people', { people })
    }
    render() {
        return (
            <div className='container'>
                <Header />
                <Body people={this.state.people} />
                <Footer />
            </div>
        )
    }
}

export default Container