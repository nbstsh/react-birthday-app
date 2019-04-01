import React, { Component } from 'react'
import '../styles/components/header.scss'
import Button from './common/Button'

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='footer'>
                <Button 
                    // handleClick={}
                    text='New Birthday!' />
            </div>
        )
    }
}

export default Footer