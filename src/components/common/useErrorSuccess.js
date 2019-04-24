import React, { useState } from 'react'

const useErrorSuccess = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSucessMessage] = useState('')

    const ErrorMessage = () => {
        return !errorMessage ? null : (
            <p className='error-message'>{errorMessage}</p>
        )
    }

    const SuccessMessage = () => {
        return !successMessage ? null : (
            <p className='success-message' >{successMessage}</p>
        )
    }

    const resetErrorAndSuccessMessages = () => {
        setErrorMessage('')
        setSucessMessage('')
    }

    return { errorMessage,  setErrorMessage, successMessage, setSucessMessage, ErrorMessage, SuccessMessage, resetErrorAndSuccessMessages }
}

export default useErrorSuccess