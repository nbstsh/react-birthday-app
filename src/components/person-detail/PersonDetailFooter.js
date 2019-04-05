import React, { Component } from 'react'
import Button from '../common/Button'

class PersonDetailFooter extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='person-detail__footer'>
                <Button text='new Memo' handleClick={this.props.openMemoForm} /> 
            </div>
        ) 
    }
}

export default PersonDetailFooter;