import React, { useState } from 'react'
import EmailInput from '../Signin/EmailInput'
import PasswordInput from '../Signin/PasswordInput'
import Joi from 'joi'

const useEmailPassword = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const emailInput = <EmailInput email={email} setEmail={setEmail}/>
    const passwordInput = <PasswordInput password={password} setPassword={setPassword} />

    const validate = () => {
        const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().min(8)
        }

        const { error } = Joi.validate({ email, password }, schema)
        if (error) throw new Error(error.details[0].message)
    }

    const resetEmailAndPassword = () => {
        setEmail('')
        setPassword('')
    }

    return { email, password, emailInput, passwordInput, validate, setEmail, setPassword, resetEmailAndPassword }
}


export default useEmailPassword