import React, { Component } from 'react'
import '../../styles/components/birthday-form.scss'
import NameInput from './NameInput';
import DateSelect from './DateSelect';
import DateDisplay from './DateDisplay';
import Button from '../common/Button';

class BirthdayForm extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='birthday-form'>
                <form>
                    <NameInput />
                    <DateSelect />
                    <DateDisplay />
                    <Button text='submit'/>
                </form>
            </div>
        )
    }
}

export default BirthdayForm


/*
<div class="modal" data-status="close" id="character-modal">
<div class="modal__background close-modal" data-target="#character-modal" id="character-form-background"></div>
<div class="modal__container modal__container--character">
    <!-- <div class="modal__header" id="chracter-form-header">Create New Character</div> -->
    <div class="modal__body">

        <form id="character-form" class="character-form">
            <div class="character-form__group character-form__group--name">
                <input type="text" name="characterName" placeholder="character name" class="character-form__name" id="character-form-name" required> 
                <label id="character-form-name">character name</label>
            </div>
            

            <button type="submit" name="submitButton" class="character-form__button button--submit" id="character-form-submit">create</button>
        </form>
    </div>
</div>
</div>

*/