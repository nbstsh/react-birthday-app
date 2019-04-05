import React, { Component } from 'react'
import BirthdayEditFormModalControll from './BirthdayEditFormModalControll'

class PersonDetailHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='person-detail__header'>
                <span className='person-detail__button' onClick={this.props.handleReturnBtn}><i className="fas fa-chevron-left"></i></span>
                <p className='person-detail__name'>{this.props.person.name}</p>
                <BirthdayEditFormModalControll person={this.props.person}/>
                <span className='person-detail__button'><i className="fas fa-trash-alt"></i></span>
            </div>
        ) 
    }
}

export default PersonDetailHeader;