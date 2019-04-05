import React, {Component } from 'react'
import '../../styles/components/memo.scss'
import MemoForm from './MemoForm';
import MemoContainer from './MemoContainer';

class MemoList extends Component {
    constructor(props) {
        super(props) 
        this.state = {}
    }
    render() {
        const { memos, personId, needShowMemoForm, closeMemoForm } = this.props
        if (!memos) return null

        return (
            <ul className='memo__list'>
                {memos.length === 0 && !needShowMemoForm &&
                    <p className='memo__empty-message'>There is no memo to show. Create a new memo!</p>
                }

                {memos.length > 0 && memos.map(memo => (
                    <MemoContainer 
                        key={memo.id}
                        memo={memo}
                        personId={personId} />
                ))}

                {needShowMemoForm && 
                    <MemoForm 
                        personId={personId} 
                        handleAfterSubmit={closeMemoForm}/>
                }
            </ul>
        )
    }
}

export default MemoList