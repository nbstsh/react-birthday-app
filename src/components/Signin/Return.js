import React from 'react'


const Return = ({ text, handleReturnClick }) => {
    return (
        <p className='auth__return' onClick={handleReturnClick}>
            <span className='auth__icon'>
                <i className="fas fa-chevron-left"></i>
            </span>
            {text}
        </p>
    )
}


export default Return