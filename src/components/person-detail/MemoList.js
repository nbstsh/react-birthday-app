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
        return (
            <ul className='memo__list'>
                {this.props.memos && this.props.memos.map(memo => (
                    <MemoContainer 
                        key={memo.id}
                        memo={memo}
                        personId={this.props.personId} />
                ))}

                {this.props.needShowMemoForm && 
                    <MemoForm 
                        personId={this.props.personId} 
                        handleAfterSubmit={this.props.closeMemoForm}/>
                }
            </ul>
        )
    }
}

export default MemoList