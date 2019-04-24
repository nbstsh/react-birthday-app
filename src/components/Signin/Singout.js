import React from 'react'
import fireabse from 'firebase/app'
import useErrorSuccess from '../common/useErrorSuccess'

const Signout = ({handleAfterSubmit}) => {
    const { setSucessMessage, SuccessMessage } = useErrorSuccess()

    const handleClick = () => {
        if (window.confirm('Are you sure to sign out?')) {
            fireabse.auth().signOut()
            setSucessMessage('Successfully signed out. Hope to see you again!')
            setTimeout(handleAfterSubmit, 1500)
        }
    }

    return (
        <div className='auth'>
            <h2 className='auth__title'>Are you sure to sign out?</h2>
            <p className='auth__description'>Once you click the button below, your data stored in cloud is deleted completely.</p>
            <SuccessMessage />
            <button className='auth__button' onClick={handleClick}>Sign out</button>
        </div>
    )
}

export default Signout