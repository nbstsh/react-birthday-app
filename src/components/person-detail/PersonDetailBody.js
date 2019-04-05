import React, { Component } from 'react'
import CalendarDate from '../common/CalendarDate'
import PersonDetailDescriptioin from './PersonDetailDescription';
import MemoList from './MemoList';
import { calcFromNow } from '../../js/util'

class PersonDetailBody extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { id, month, date, name, memos } = this.props.person 

        return (
            <div className='person-detail__body'>
                <CalendarDate month={month} date={date} />

                <PersonDetailDescriptioin 
                    durationFromNow={calcFromNow(month, date)}
                    name={name} />

                <MemoList 
                    personId={id}
                    memos={memos}
                    closeMemoForm={this.props.closeMemoForm}
                    needShowMemoForm={this.props.needShowMemoForm} />
            </div>
        ) 
    }
}


export default PersonDetailBody;