import React from 'react'
import '../../styles/components/button.scss'

const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick} className='button'>{text}</button>
    )
}

export default Button