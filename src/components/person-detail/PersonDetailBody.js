import React, { Component } from 'react'
import CalendarDate from '../common/CalendarDate'
import PersonDetailDescriptioin from './PersonDetailDescription';
import MemoList from './MemoList';
import moment from 'moment'

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

function calcFromNow(month, date) {
    const currentMonth = moment().month() + 1
    const currentDate = moment().date()
    const currentYear = moment().year()
    const year = month > currentMonth ? currentYear 
                : month === currentMonth && date >= currentDate ? currentYear
                : currentYear + 1
                
    const target = moment([year, month - 1, date])
    const today = moment()
    var duration = moment.duration(target.diff(today))

    return Math.round(duration.asDays())
}


export default PersonDetailBody;