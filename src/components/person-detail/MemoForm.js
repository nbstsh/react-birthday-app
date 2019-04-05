import React, { Component } from 'react'
import '../../styles/components/memo-form.scss'
import manager from '../../js/person-manager'

class MemoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memoContent: ''
        }
    }
    componentDidMount() {
        if (!this.props.memo) return 

        this.setState({ memoContent: this.props.memo.content })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { personId, memo } = this.props || {}
        const { memoContent } = this.state

        if (memoContent && memo) {
            memo.content = memoContent
            manager.updateMemo(personId, memo)
        } else if (memoContent){
            manager.createMemo(personId, memoContent)
        }

        if ('handleAfterSubmit' in this.props) 
            this.props.handleAfterSubmit()
    }
    handleChange = (e) => {
        this.setState({ memoContent: e.target.value})
    }
    handleDeleteBtnClick = (e) => {
        e.stopPropagation()

        const { personId, memo } = this.props || {}
        manager.deleteMemo(personId, memo.id)

        if ('handleAfterSubmit' in this.props) 
            this.props.handleAfterSubmit()
    }
    render() {
        return (
            <form className='memo-form' onSubmit={this.handleSubmit}>
                <textarea 
                    name='memo' 
                    className='memo-form__textarea' 
                    onChange={this.handleChange}
                    value={this.state.memoContent}></textarea>
                <button 
                    type='submit' 
                    className='memo-form__submit'></button>
                
                <span className='memo-form__delete-btn' onClick={this.handleDeleteBtnClick}>
                    <i className="fas fa-trash-alt"></i>
                </span>
            </form>
        ) 
    }
}

export default MemoForm