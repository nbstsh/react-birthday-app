import React, { Component } from 'react'
import '../styles/components/header.scss'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='header'>
                <p className='header__title'>All</p>
            </div>
        )
    }
}

export default Header