import React from 'react'

const PasswordInput = ({ password, setPassword }) => {
    return (
        <div className='signin__form-group'>
            <input 
                className='signin__input'
                type='password' 
                name='password' 
                value={password}
                required
                minLength='8'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}/>
            
            <label>password</label>
        </div>
    )
}

export default PasswordInput