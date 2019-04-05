import React, { Component } from 'react'
import '../styles/components/header.scss'
import BirthdayFormModalControll from './BirthdayFormModalControll';


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