import React, { Component } from 'react'
import SearchField from './search-field/SearchField'
import '../styles/components/header.scss'

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='header'>
                <p className='header__title'>{this.props.title}</p>
                <SearchField /> 
            </div>
        )
    }
}

export default Header