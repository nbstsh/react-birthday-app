import React, { Component } from 'react'
import '../styles/components/container.scss'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'


class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='container'>
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}

export default Container