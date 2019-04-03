import React from 'react'


const BirthdayCard = ({month, date, name}) => {
    return (
        <div className='BirthdayCard'>
            <h1>{date}</h1>
            <p>{name}</p>
        </div>
    )
}


export default BirthdayCard