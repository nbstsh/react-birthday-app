import React, { Component } from 'react' 
import ReactModal from 'react-modal'
import firebase from 'firebase/app'
import AuthForm from './AuthForm'
import Signout from './Singout'

class AuthFormModalControll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
    }
    handleOpenModal = () => {
        this.setState({ showModal: true })
    }
    handleCloseModal = () => {
        this.setState({ showModal: false })
    }
    render() {
        const content = firebase.auth().currentUser ? (
            <Signout handleAfterSubmit={this.handleCloseModal} />
        ) : (
            <AuthForm  handleAfterSubmit={this.handleCloseModal} />   
        )

        return (
            <React.Fragment>
                <span className='footer__modal-trigger' onClick={this.handleOpenModal}>
                    <i className="fas fa-user"></i>
                </span>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel='Singin Form Modal'
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true} 
                    className={`modal__content ${this.state.isClosing ? 'close' : ''}`}
                    overlayClassName='modal__overlay' >
                    
                    {content}

                </ReactModal>

            </React.Fragment>
        )
    }
}


export default AuthFormModalControll