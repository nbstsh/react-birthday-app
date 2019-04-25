import React, { Component } from 'react'
import '../../styles/components/person-detail.scss'
import PersonDetailHeader from './PersonDetailHeader'
import PersonDetailBody from './PersonDetailBody';
import PersonDetailFooter from './PersonDetailFooter';

class PersonDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memos: [],
            needShowMemoForm: false
        }
    }
    handleReturnBtn = () => {
        this.props.setSelectedPersonId('')
    }
    openMemoForm = () => {
        this.setState({ needShowMemoForm: true })
        setTimeout(this.focusMemoForm, 500)
    }
    closeMemoForm = () => {
        this.setState({ needShowMemoForm: false })
    }
    focusMemoForm() {
        // make sure memo form is visible and focused when it shows
        const memoForm = document.querySelector('.memo-form__textarea')
        memoForm.focus()
    }
    render() {
        return (
            <div className='person-detail'>
                <PersonDetailHeader 
                    person={this.props.person} 
                    handleReturnBtn={this.handleReturnBtn}/>
                <PersonDetailBody 
                    person={this.props.person}
                    needShowMemoForm={this.state.needShowMemoForm}
                    openMemoForm={this.openMemoForm}
                    closeMemoForm={this.closeMemoForm}/>
                {!this.state.needShowMemoForm &&
                    <PersonDetailFooter 
                        openMemoForm={this.openMemoForm} />
                }
            </div>
        ) 
    }
}


export default PersonDetail;