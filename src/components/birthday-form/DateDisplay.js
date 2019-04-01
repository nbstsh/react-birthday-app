import React, { Component } from 'react'
import '../../styles/components/date-display.scss'


class DateDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        let monthNums = []
        for(let i = 1; i <= 12; i++) {
            monthNums.push(
                <span 
                    className={`date-display__month-number ${i === 1 ? 'clicked' : ''}`}
                    data-value={i}>{i}</span>
            )
        }

        let dateNums = []
        for(let i = 1; i <= 31; i++) {
            dateNums.push(
                <span 
                    class={`date-display__date-number ${i === 1 ? 'clicked' : ''}`} 
                    data-value={i}>{i}</span>
            )
        }
        return (
            <div className='date-display'>

                <div class='date-display__month'>
                    {monthNums}
                </div>

                <div class='date-display__date'>
                    {dateNums}
                </div>

            </div>
        )
    }
}

export default DateDisplay
