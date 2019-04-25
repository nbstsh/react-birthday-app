import React from 'react'

const Memo = ({ id, content, handleClick }) => {
    if (!id) return null

    return (
        <div className='memo__item' onClick={handleClick}>
            {content.split('\n').map((line, key) => (
                <React.Fragment key={key}>{line}<br /></React.Fragment>
            ))}
        </div>
    )
}

export default Memo