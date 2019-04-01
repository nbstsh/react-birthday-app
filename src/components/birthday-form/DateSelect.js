import React, { Component } from 'react'

class DateSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        let monthOptions = []
        for(let i = 1; i <= 12; i++) {
            monthOptions.push(<option value={i}>{i}月</option>)
        }

        let dayOptions = []
        for(let i = 1; i <= 31; i++) {
            dayOptions.push(<option value={i}>{i}日</option>)
        }
        return (
            <div className="birthday-form__group birthday-form__group--date">
                <div className="birthday-form__select-wrapper">
                    <span className="birthday-form__selected-number" id="selected-month-text">1月</span>
                    <select name="month" id="birthday-form-month" className="birthday-form__month">
                        {monthOptions}
                    </select>
                </div>
                <div className="birthday-form__select-wrapper">
                    <span className="birthday-form__selected-number" id="selected-date-text">1日</span>
                    <select name="date" id="birthday-form-date" className="birthday-form__date" placeholder="Date">
                        {dayOptions}
                    </select>
                </div>
                
            </div>
        )
    }
}

export default DateSelect