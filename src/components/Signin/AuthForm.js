import React, { useState } from 'react'
import '../../styles/components/auth.scss'
import Joi from 'joi'
import useErrorSuccess from '../common/useErrorSuccess'
import firebase from 'firebase/app'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import SignupDescription from './SignupDescription'
import SigninDescription from './SigninDescription'
import useLoader from '../common/useLoader'

const AuthForm = ({ handleAfterSubmit }) => {
    const [authType, setAuthType] = useState('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { needLoader, setNeedLoader, Loader} = useLoader()
    const { setErrorMessage, setSucessMessage, ErrorMessage, SuccessMessage, resetErrorAndSuccessMessages } = useErrorSuccess()
    const text = { signup: 'Sign up', signin: 'Sign in'}

    const handleSuccess = () => {
        setEmail('')
        setPassword('')
        resetErrorAndSuccessMessages()
        handleAfterSubmit && handleAfterSubmit()
    }

    const validate = () => {
        const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().min(8)
        }

        const { error } = Joi.validate({ email, password }, schema)
        if (error) throw new Error(error.details[0].message)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        resetErrorAndSuccessMessages()

        try {
            validate()
            setNeedLoader(true)

            if (authType === 'signup') {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
            } else if (authType === 'signin') {
                await firebase.auth().signInWithEmailAndPassword(email, password)
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
    const handleLinkClick = () => {
        resetErrorAndSuccessMessages()
        if (authType === 'signup') setAuthType('signin')    
        if (authType === 'signin') setAuthType('signup')
    }

    const SubmitButton = () => (
        <button type='submit' className='auth__button'>
            <Loader />
            {!needLoader && text[authType]}
        </button>
    )

    return (
        <div className='auth'>
            {title[authType]}
            {description[authType]}
            <ErrorMessage />
            <SuccessMessage />
            <form onSubmit={handleSubmit} className='auth__form'>
                <EmailInput email={email} setEmail={setEmail}/>
                <PasswordInput password={password} setPassword = {setPassword} />
                <SubmitButton />
                <button type='button' className='auth__link' onClick={handleLinkClick}>{link[authType]}</button>
            </form>
        </div>
    )
}

export default AuthForm