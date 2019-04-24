import React from 'react'
import fireabse from 'firebase/app'
import useErrorSuccess from '../common/useErrorSuccess'
import useEmailPassword from '../common/useEmailPassword'
import useLoader from '../common/useLoader'


const DeleteAccountForm = ({ handleAfterSubmit, closeDeleteForm }) => {
    const { setNeedLoader, loader } = useLoader()
    const { email, password,  emailInput, passwordInput, validate } = useEmailPassword()
    const { setSucessMessage, SuccessMessage, setErrorMessage, ErrorMessage, resetErrorAndSuccessMessages } = useErrorSuccess()

    const handleDelete = async (e) => {
        e.preventDefault()
        resetErrorAndSuccessMessages()

        try {
            validate()
            setNeedLoader(true)
            await fireabse.auth().signInWithEmailAndPassword(email, password)

            if (window.confirm('Are you sure to Delete acount?')) {
                await fireabse.auth().currentUser.delete()

                setSucessMessage('Successfully delete your account. We hope to see you again!')
                setNeedLoader(false)
                setTimeout(handleAfterSubmit, 1500)
            }
        }
        catch (e) {
            const errorMessage = e.code && e.code.includes('auth') ? 'Invalid password or email' : e.message
            setNeedLoader(false)
            setErrorMessage(errorMessage)
        }
    }

    return (
        <div className='auth'>
            <h2 className='auth__title'>Please enter email and password</h2>
            <SuccessMessage />
            <ErrorMessage />
            <form className='auth__form' onSubmit={handleDelete}>
                {emailInput}
                {passwordInput}
                <button className='auth__button'>
                    {loader || 'Delete Account' }
                </button>
                <button type='button' className='auth__link' onClick={closeDeleteForm}>
                    Cancel
                </button>
            </form>
        </div>
    )
}


export default DeleteAccountForm