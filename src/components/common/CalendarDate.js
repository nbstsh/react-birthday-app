import React from 'react'
import '../../styles/components/calendar-date.scss'

const CalendarDate = ({ month, date }) => {

    return (
        <div className='calendar-date'>
            <span className='calendar-date__month'>{month}</span>
            <span className='calendar-date__date'>{date}</span>
        </div>
    )
}

export default CalendarDate