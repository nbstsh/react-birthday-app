import React, { useState } from 'react'
import '../../styles/components/auth.scss'
import useErrorSuccess from '../common/useErrorSuccess'
import firebase from 'firebase/app'
import SignupDescription from './SignupDescription'
import SigninDescription from './SigninDescription'
import useEmailPassword from '../common/useEmailPassword'
import useLoader from '../common/useLoader'
import { uploadAllPeopleToFirestore, syncDataFromFirestore } from '../../js/firestore'
import Return from './Return'

const AuthForm = ({ handleAfterSubmit }) => {
    const [authType, setAuthType] = useState('signin')
    const { setNeedLoader, loader} = useLoader()
    const { email, password,  emailInput, passwordInput, validate, resetEmailAndPassword } = useEmailPassword()
    const { setErrorMessage, setSucessMessage, ErrorMessage, SuccessMessage, resetErrorAndSuccessMessages } = useErrorSuccess()

    const text = { signup: 'Sign up', signin: 'Sign in'}
    const title = {
        signin : <h2 className='auth__title'>Sign in and Save data!</h2>,
        signup: <h2 className='auth__title'>Hi there! Welcome to Birthday app!</h2>
    }
    const description = {
        signin : <SigninDescription />,
        signup: <SignupDescription />
    }            
    const link = {
        signin: 'Need sign up?',
        signup: 'Need sign in?'
    }

    const handleSuccess = () => {
        resetEmailAndPassword()
        resetErrorAndSuccessMessages()
        handleAfterSubmit && handleAfterSubmit()
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        resetErrorAndSuccessMessages()

        try {
            validate()
            setNeedLoader(true)

            if (authType === 'signup') {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                uploadAllPeopleToFirestore()
            } else if (authType === 'signin') {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                syncDataFromFirestore().then(() => {
                    window.location.reload()
                })
            }

            setSucessMessage(`Successfully ${text[authType]}!`)
            setNeedLoader(false)

            setTimeout(() => handleSuccess(), 800)
        } 
        catch (e) { 
            const errorMessage = e.code && e.code.includes('auth') ? 'Invalid password or email' : e.message
            setErrorMessage(errorMessage)
            setNeedLoader(false)
        }         
    }

    const handleLinkClick = () => {
        resetErrorAndSuccessMessages()
        if (authType === 'signup') setAuthType('signin')    
        if (authType === 'signin') setAuthType('signup')
    }

    return (
        <div className='auth'>
            {title[authType]}
            {description[authType]}
            <ErrorMessage />
            <SuccessMessage />
            <form onSubmit={handleSubmit} className='auth__form'>
                {emailInput}
                {passwordInput}
                <button type='submit' className='auth__button'>
                    {loader || text[authType]}
                </button>
                <button type='button' className='auth__link' onClick={handleLinkClick}>
                    {link[authType]}
                </button>
            </form>

            <Return text={`Close ${text[authType]} form`} handleReturnClick={handleAfterSubmit}/>
        </div>
    )
}

export default AuthForm