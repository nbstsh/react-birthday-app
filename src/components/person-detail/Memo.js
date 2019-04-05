import React from 'react'

const Memo = ({ id, content, handleClick }) => {
    if (!id) return null

    return (
        <div className='memo__item' onClick={handleClick}>
            {content}
        </div>
    )
}

export default Memo