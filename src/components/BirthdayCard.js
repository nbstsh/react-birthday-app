import React from 'react'


const BirthdayCard = ({month, date, name}) => {
    return (
        <div className='BirthdayCard'>
            <h1>{month}</h1>
            <h2>{date}</h2>
            <p>{name}</p>
        </div>
    )
}


export default BirthdayCard