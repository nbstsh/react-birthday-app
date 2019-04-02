import React, { Component } from 'react'
import '../../styles/components/birthday-form.scss'
import NameInput from './NameInput';
import DateSelect from './DateSelect';
import DateDisplay from './DateDisplay';
import Button from '../common/Button';

class BirthdayForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monthNum: 1,
            dateNum: 1
        }
    }
    setMonthNum = (monthNum) => {
        this.setState({ monthNum })
    }
    setDateNum = (dateNum) => {
        this.setState({ dateNum })
    }
    render() {
        const { monthNum, dateNum } = this.state
        return (
            <div className='birthday-form'>
                <form>
                    <NameInput />
                    <DateSelect 
                        monthNum={monthNum} 
                        dateNum={dateNum}
                        setMonthNum={this.setMonthNum}
                        setDateNum={this.setDateNum}/>
                    <DateDisplay />
                    <Button text='submit'/>
                </form>
            </div>
        )
    }
}

export default BirthdayForm

