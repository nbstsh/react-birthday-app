import React from 'react'
import fireabse from 'firebase/app'
import useErrorSuccess from '../common/useErrorSuccess'
import useLoader from '../common/useLoader'
import '../../styles/base/util.scss'

const Signout = ({ handleAfterSubmit, openDeleteForm }) => {
    const { setSucessMessage, SuccessMessage, setErrorMessage, ErrorMessage, resetErrorAndSuccessMessages } = useErrorSuccess()
    const { setNeedLoader, loader } = useLoader()

    const handleSignoutClick = async () => {
        resetErrorAndSuccessMessages()
        setNeedLoader(true)

        try {
            await fireabse.auth().signOut()
            setSucessMessage('Successfully signed out!')
            setNeedLoader(false)
            setTimeout(handleAfterSubmit, 800)
        }
        catch (e) {
            setErrorMessage(e.message)
        }
    }

    return (
        <div className='auth'>
            <h2 className='auth__title'>Sign out? Delete your account?</h2>
            <p className='auth__description'>You can access your data again if you sign in again after sign out.But once you click delete the account, your data stored in cloud is deleted completely.</p>
            <SuccessMessage />
            <ErrorMessage />
            <button className='auth__button u-margin-bottom-sm' onClick={handleSignoutClick}>
                    {loader || 'Sign out' }
            </button>
            <button className='auth__button' onClick={openDeleteForm}>
                Delete Account
            </button>
        </div>
    )
}

export default Signout