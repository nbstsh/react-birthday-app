import React, { Component } from 'react'
import '../../styles/components/birthday-form.scss'
import NameInput from './NameInput';
import DateSelect from './DateSelect';
import DateDisplay from './DateDisplay';
import Button from '../common/Button';
import { createCharacter } from '../../js/character'

class BirthdayForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monthNum: 1,
            dateNum: 1
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const name = e.target.name.value
        const birthday = `${e.target.month.value}/${e.target.date.value}`

        console.log({ name, birthday })
        createCharacter({ name, birthday})
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
                <form onSubmit={this.handleSubmit}>
                    <NameInput />
                    <DateSelect 
                        monthNum={monthNum} 
                        dateNum={dateNum}
                        setMonthNum={this.setMonthNum}
                        setDateNum={this.setDateNum}/>
                    <DateDisplay 
                        monthNum={monthNum} 
                        dateNum={dateNum}
                        setMonthNum={this.setMonthNum}
                        setDateNum={this.setDateNum}/>
                    <Button text='submit'/>
                </form>
            </div>
        )
    }
}

export default BirthdayForm

