import React from 'react'
import loader from './loader.gif'

const LoaderGif = () => {
    return (
        <div className='loader'>
            <img src={loader} alt='loader' />
        </div>
    )
}

export default LoaderGif