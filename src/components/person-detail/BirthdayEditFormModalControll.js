import React, { Component } from 'react'
import ReactModal from 'react-modal'
import BirthdayForm from '../birthday-form/BirthdayForm'
import '../../styles/components/modal.scss'
ReactModal.setAppElement('#root');

class BirthdayEditFormModalControll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            isClosing: false
        }
    }
    handleOpenModal = () => {
        this.setState({ showModal: true })
    }
    handleCloseModal = () => {
        this.setState({ showModal: false })
    }
    handleOverlayClick = () => {
        this.setState({ isClosing: true })
        setTimeout(() => {
            this.setState({ isClosing: false })
            this.handleCloseModal()
        }, 200)
    }
    render() {
        return (
            <React.Fragment>

                <span className='person-detail__button' onClick={this.handleOpenModal}>
                    <i className="fas fa-edit"></i>
                </span>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel='Birthday Form Modal'
                    onRequestClose={this.handleOverlayClick}
                    shouldCloseOnOverlayClick={true} 
                    className={`modal__content ${this.state.isClosing ? 'close' : ''}`}
                    overlayClassName={`modal__overlay ${this.state.isClosing ? 'close' : ''}`}>

                    <BirthdayForm 
                        person={this.props.person}
                        handleAfterSubmit={this.handleCloseModal}/>

                </ReactModal>
            </React.Fragment>
        )
    }
}

export default BirthdayEditFormModalControll