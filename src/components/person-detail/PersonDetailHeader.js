import React, { Component } from 'react'
import BirthdayEditFormModalControll from './BirthdayEditFormModalControll'
import manager from '../../js/person-manager';

class PersonDetailHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            needShowDeleteBtn: false
        }
    }
    toggleDeleteBtn = () => {
        this.setState({ needShowDeleteBtn: !this.state.needShowDeleteBtn })
    }
    handleDeleteBtnCoverClick = (e) => {
        e.stopPropagation()
        this.toggleDeleteBtn()
    } 
    handleDeleteBtnClick = () => {
        manager.removePerson(this.props.person.id)
        this.props.handleReturnBtn()
    }
    render() {
        const coverStatus = this.state.needShowDeleteBtn ? 'remove' : ''
        return (
            <div className='person-detail__header'>

                <span 
                    className='person-detail__button' 
                    onClick={this.props.handleReturnBtn}>
                    <i className="fas fa-chevron-left"></i>
                </span>

                <p className='person-detail__name'>{this.props.person.name}</p>

                <BirthdayEditFormModalControll 
                    person={this.props.person}/>

                <span 
                    className='person-detail__button'
                    onClick={this.handleDeleteBtnClick}>
                    <span 
                        className={`person-detail__button-cover ${coverStatus}`}
                        onClick={this.handleDeleteBtnCoverClick}></span>
                    <i className="fas fa-trash-alt"></i>
                </span>
            </div>
        ) 
    }
}

export default PersonDetailHeader;