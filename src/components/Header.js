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
                <p className='header__month'>1月</p>
            </div>
        )
    }
}

export default Header