import React from 'react'
import SearchField from './search-field/SearchField'
import '../styles/components/header.scss'

const Header = ({ title }) => {
    return (
        <div className='header'>
            <p className='header__title'>{toMonthName(title)}</p>
            <SearchField /> 
        </div>
    )
} 

function toMonthName(monthNum) {
    const monthNames = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }
    if (!(monthNum in monthNames)) return monthNum

    return monthNames[monthNum]
}

export default Header