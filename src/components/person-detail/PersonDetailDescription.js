import React from 'react'


const PersonDetailDescriptioin = ({ name, durationFromNow }) => {

    return (
        <p className='person-detail__description'>
            <span>{name}'s birthday is in </span>
            <span>{durationFromNow}</span> 
            <span>days!!!</span>
        </p>
    )
}

export default PersonDetailDescriptioin