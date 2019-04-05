import React, { Component } from 'react'

class PersonDetailHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='person-detail__header'>
                <span className='person-detail__button'><i class="fas fa-chevron-left"></i></span>
                <p className='person-detail__name'>{this.props.name}</p>
                <span className='person-detail__button'><i className="fas fa-edit"></i></span>
                <span className='person-detail__button'><i className="fas fa-trash-alt"></i></span>
            </div>
        ) 
    }
}

export default PersonDetailHeader;