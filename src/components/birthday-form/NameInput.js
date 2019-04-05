import React from 'react'


const NameInput = ({ name, handleChange }) => {
    return (
        <div className="birthday-form__group birthday-form__group--name">

            <input 
                type="text" 
                name="name" 
                placeholder="name" 
                className="birthday-form__name" 
                value={name} 
                onChange={handleChange}
                required />

            <label id="birthday-form-name">
                name
            </label>

        </div>
    )
}

export default NameInput