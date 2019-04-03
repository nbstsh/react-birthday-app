import React, { Component } from 'react'
import '../styles/components/header.scss'
import BirthdayCard from './BirthdayCard'
import BirthdayCardList from './BirthdayCardList'
import {  getFilteredCharacters } from '../js/character'
import { initDates, getFilteredDates } from '../js/dates'
import { sortByBirthday } from '../js/sort'
import { getFilters } from '../js/filters'



class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const filters = getFilters()
        const filteredCharacters = getFilteredCharacters(filters)
        initDates(sortByBirthday(filteredCharacters), true) // each item should container
        const filteredDates = getFilteredDates(filters)

        console.log(filteredDates)

        const listItems = filteredDates.map(({ month, date, character }) => {
            return {
                month,
                date, 
                name: character.name
            }
        })
        console.log(listItems)

        return (
            <div className='body'>
                <BirthdayCardList listItems={listItems} />
            </div>
        )
    }
}

export default Body