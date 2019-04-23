import React, { Component } from 'react' 
import ReactModal from 'react-modal'
import AuthForm from './AuthForm';

class AuthFormModalControll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            isSinedin: false
        }
    }
    handleOpenModal = () => {
        this.setState({ showModal: true })
    }
    handleCloseModal = () => {
        this.setState({ showModal: false })
    }
    setIsSignedin = (isSinedin) => {
        this.setState({ isSinedin })
    }
    render() {
        const content = this.state.isSinedIn ? (
            <h1>Sign out form</h1>
        ) : (
            <AuthForm  handleAfterSubmit={() => {
                this.handleCloseModal()
                this.setIsSignedin(true)
            }} />   
        )

        return (
            <React.Fragment>
                <span className='person-detail__button' onClick={this.handleOpenModal}>
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