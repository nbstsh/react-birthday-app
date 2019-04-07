import React, { Component } from 'react'
import CalenderDate from '../common/CalendarDate'
import { lastDateOf } from '../../js/util'


class DateSelect extends Component {
    handleMonthChange = (e) => {
        this.props.setMonthNum(Number(e.target.value))
    }
    handleDateChange = (e) => {
        this.props.setDateNum(Number(e.target.value))
    }
    render() {
        let monthOptions = []
        for(let i = 1; i <= 12; i++) {
            monthOptions.push(<option key={i} value={i}>{i}</option>)
        }

        let dayOptions = []
        for(let i = 1; i <= lastDateOf(this.props.monthNum); i++) {
            dayOptions.push(<option key={i} value={i}>{i}</option>)
        }
        return (
            <div className="birthday-form__group birthday-form__group--date">
                
                <select 
                    name="month" 
                    className="birthday-form__month-select" 
                    onChange={this.handleMonthChange} 
                    value={this.props.monthNum}>

                    {monthOptions}

                </select>

                <select 
                    name="date" 
                    className="birthday-form__date-select" 
                    placeholder="Date" 
                    onChange={this.handleDateChange} 
                    value={this.props.dateNum}>

                    {dayOptions}

                </select>

                <CalenderDate month={this.props.monthNum} date={this.props.dateNum}/>
                
            </div>
        )
    }
}

export default DateSelect