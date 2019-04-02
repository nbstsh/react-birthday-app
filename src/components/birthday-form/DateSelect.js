import React, { Component } from 'react'

class DateSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleMonthChange = (e) => {
        this.props.setMonthNum(Number(e.target.value))
    }
    handleDateChange = (e) => {
        this.props.setDateNum(Number(e.target.value))
    }
    render() {
        let monthOptions = []
        for(let i = 1; i <= 12; i++) {
            monthOptions.push(<option key={i} value={i}>{i}月</option>)
        }

        let dayOptions = []
        for(let i = 1; i <= 31; i++) {
            dayOptions.push(<option key={i} value={i}>{i}日</option>)
        }
        return (
            <div className="birthday-form__group birthday-form__group--date">
                <div className="birthday-form__select-wrapper">
                    <span className="birthday-form__selected-number">{this.props.monthNum}月</span>
                    <select name="month" className="birthday-form__month" onChange={this.handleMonthChange}>
                        {monthOptions}
                    </select>
                </div>
                <div className="birthday-form__select-wrapper">
                    <span className="birthday-form__selected-number">{this.props.dateNum}日</span>
                    <select name="date" className="birthday-form__date" placeholder="Date" onChange={this.handleDateChange}>
                        {dayOptions}
                    </select>
                </div>
                
            </div>
        )
    }
}

export default DateSelect