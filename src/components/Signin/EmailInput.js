import React from 'react'

const EmailInput = ({ email, setEmail}) => {
    return (
        <div className='signin__form-group'>
            <input 
                className='signin__input'
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