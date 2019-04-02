import React, { Component } from 'react'
import '../styles/components/header.scss'
import Button from './common/Button'
import BirthdayFormModalControll from './BirthdayFormModal';


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='footer'>
                <BirthdayFormModalControll />
            </div>
        )
    }
}

export default Footer