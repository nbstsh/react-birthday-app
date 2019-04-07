import React from 'react'


const ButtonBox = ({handleCancelBtnClick}) => {
    return (
        <div className='birthday-form__group birthday-form__group--btns'>
            <button 
                type='button' 
                className='birthday-form__btn' 
                onClick={handleCancelBtnClick}>cancel</button>
            <button 
                type='submit' 
                className='birthday-form__btn'>submit</button>
        </div>
    )
}


export default ButtonBox