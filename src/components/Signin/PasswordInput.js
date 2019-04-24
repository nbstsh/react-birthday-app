import React from 'react'

const PasswordInput = ({ password, setPassword }) => {
    return (
        <div className='auth__form-group'>
            <input 
                className='auth__input'
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