import React from 'react'
import SearchField from './search-field/SearchField'
import '../styles/components/header.scss'

const Header = ({ title }) => {
    return (
        <div className='header'>
            <p className='header__title'>{title}</p>
            <SearchField /> 
        </div>
    )
} 


export default Header