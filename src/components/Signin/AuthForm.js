import React, { useState } from 'react'
import '../../styles/components/signin.scss'
import Joi from 'joi'
import useErrorSuccess from '../common/useErrorSuccess'
import firebase from 'firebase/app'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import SignupDescription from './SignupDescription'
import SigninDescription from './SigninDescription'

const AuthForm = ({ handleAfterSubmit }) => {
    const [authType, setAuthType] = useState('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

            if (authType === 'signup') {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
            } else if (authType === 'signin') {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }
            setSucessMessage(`Successfully ${text[authType]}!`)
            setTimeout(() => handleSuccess(), 1000)
        } 
        catch (e) { 
            const errorMessage = e.code && e.code.includes('auth') ? 'Invalid password or email' : e.message
            setErrorMessage(errorMessage)
        }         
    }

    const title = {
        signin : <h2 className='signin__title'>Sign in and Save data!</h2>,
        signup: <h2 className='signin__title'>Hi there! Welcome to Birthday app!</h2>
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
        if (authType === 'signup') {
            setAuthType('signin')
        } else if (authType === 'signin'){
            setAuthType('signup')
        } 
    }

    return (
        <div className='signin'>
            {title[authType]}
            {description[authType]}
            <ErrorMessage />
            <SuccessMessage />
            <form onSubmit={handleSubmit} className='signin__form'>
                <EmailInput email={email} setEmail={setEmail}/>
                <PasswordInput password={password} setPassword = {setPassword} />
                <button type='submit' className='signin__button'>{text[authType]}</button>
                <button type='button' className='signin__link' onClick={handleLinkClick}>{link[authType]}</button>
            </form>
        </div>
    )
}

export default AuthForm