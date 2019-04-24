import React from 'react'

const EmailInput = ({ email, setEmail}) => {
    return (
        <div className='auth__form-group'>
            <input 
                className='auth__input'
                type='email' 
                name='email' 
                value={email} 
                required
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}/>
            
            <label>email</label>
        </div>
    )
}

export default EmailInput