import React, { Component } from 'react'
import '../styles/components/footer.scss'
import BirthdayFormModalControll from './BirthdayFormModalControll';
import AuthFormModalController from './Signin/AuthFormModalController';


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='footer'>
                <BirthdayFormModalControll />
                <AuthFormModalController />
            </div>
        )
    }
}

export default Footer