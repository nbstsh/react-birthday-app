import React from 'react'


const BirthdayCard = ({ id, month, date, name, setSelectedPersonId }) => {
    const handleClick = () => {
        setSelectedPersonId(id)
    }

    return (
        <div className='birthday-card__item' onClick={handleClick}>
            <h1 className='birthday-card__month'>{month}</h1>
            <h2 className='birthday-card__date'>{date}</h2>
            <p className='birthday-card__name'>{name}</p>
        </div>
    )
}


export default BirthdayCard