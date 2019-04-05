import React from 'react'


const BirthdayCard = ({month, date, name}) => {
    return (
        <div className='birthday-card__item'>
            <h1 className='birthday-card__month'>{month}</h1>
            <h2 className='birthday-card__date'>{date}</h2>
            <p className='birthday-card__name'>{name}</p>
        </div>
    )
}


export default BirthdayCard