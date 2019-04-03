import React, { Component } from 'react'


const NameInput = () => {
    return (
        <div className="birthday-form__group birthday-form__group--name">
            <input type="text" name="name" placeholder="birthday name" className="birthday-form__name" required />
            <label id="birthday-form-name">birthday name</label>
        </div>
    )
}

export default NameInput