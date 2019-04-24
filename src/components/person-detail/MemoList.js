import React from 'react'
import '../../styles/components/memo.scss'
import MemoForm from './MemoForm';
import MemoContainer from './MemoContainer';


const MemoList = ({ memos, personId, needShowMemoForm, closeMemoForm }) => {
    return (
        <ul className='memo__list'>
            {memos && memos.length === 0 && !needShowMemoForm &&
                <p className='memo__empty-message'>There is no memo to show. Create a new memo!</p>
            }

            {memos && memos.length > 0 && memos.map(memo => (
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


export default MemoList