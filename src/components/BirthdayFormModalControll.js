import React, { Component } from 'react'
import ReactModal from 'react-modal'
import BirthdayForm from './birthday-form/BirthdayForm'
import '../styles/components/modal.scss'
import Button from './common/Button'
ReactModal.setAppElement('#root');

class BirthdayFormModalControll extends Component {
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
                <Button text='new Birthday' handleClick={this.handleOpenModal}/>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel='Birthday Form Modal'
                    onRequestClose={this.handleOverlayClick}
                    shouldCloseOnOverlayClick={true} 
                    className={`modal__content ${this.state.isClosing ? 'close' : ''}`}
                    overlayClassName={`modal__overlay ${this.state.isClosing ? 'close' : ''}`}>

                    <BirthdayForm handleAfterSubmit={this.handleCloseModal}/>

                </ReactModal>
            </React.Fragment>
        )
    }
}

export default BirthdayFormModalControll