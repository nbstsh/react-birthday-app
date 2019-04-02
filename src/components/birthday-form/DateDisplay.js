import React, { Component } from 'react'
import '../../styles/components/date-display.scss'


class DateDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleMonthClick = (e) => {
        this.props.setMonthNum(Number(e.target.dataset.value))
    }
    handleDateClick = (e) => {
        this.props.setDateNum(Number(e.target.dataset.value))
    }
    render() {
        let monthNums = []
        for(let i = 1; i <= 12; i++) {
            const clicked = i === this.props.monthNum ? 'clicked' : ''
            monthNums.push(
                <span 
                    key={i}
                    className={`date-display__month-number ${clicked}`}
                    data-value={i}
                    onClick={this.handleMonthClick}>{i}</span>
            )
        }

        let dateNums = []
        for(let i = 1; i <= 31; i++) {
            const clicked = i === this.props.dateNum ? 'clicked' : ''
            dateNums.push(
                <span 
                    key={i}
                    className={`date-display__date-number ${clicked}`} 
                    data-value={i}
                    onClick={this.handleDateClick}>{i}</span>
        
            )
        }
        return (
            <div className='date-display'>

                <div className='date-display__month'>
                    {monthNums}
                </div>

                <div className='date-display__date'>
                    {dateNums}
                </div>

            </div>
        )
    }
}

export default DateDisplay
