import React, { Component } from 'react'
import '../../styles/components/birthday-form.scss'
import NameInput from './NameInput';
import DateSelect from './DateSelect';
import DateDisplay from './DateDisplay';
import Button from '../common/Button';
import manager from '../../js/person-manager'


class BirthdayForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            monthNum: 1,
            dateNum: 1
        }
    }
    componentDidMount() {
        if (!this.props.person) return  

        const { name, month, date } = this.props.person
        this.setState({ 
            name,
            monthNum: month,
            dateNum: date
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const newPerson = {
            name: e.target.name.value,
            month: Number(e.target.month.value),
            date: Number(e.target.date.value)
        }

        if (this.props.person) {
            Object.assign(this.props.person, newPerson)
            manager.updatePerson(this.props.person)
        } else {
            manager.createPerson(newPerson)
        }

        if ('handleAfterSubmit' in this.props) 
            this.props.handleAfterSubmit()
    }
    setMonthNum = (monthNum) => {
        this.setState({ monthNum })
    }
    setDateNum = (dateNum) => {
        this.setState({ dateNum })
    }
    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    handleCancelBtnClick = () => {
        if ('handleAfterSubmit' in this.props) 
            this.props.handleAfterSubmit()
    }
    render() {
        const { name, monthNum, dateNum } = this.state
        return (
            <div className='birthday-form'>
                <form onSubmit={this.handleSubmit}>
                    <NameInput 
                        name={name}
                        handleChange={this.handleNameChange} />
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

                    <button 
                        type='button' 
                        className='birthday-form__btn' 
                        onClick={this.handleCancelBtnClick}>cancel</button>
                    <button 
                        type='submit' 
                        className='birthday-form__btn'>submit</button>
                    
                   
                </form>
            </div>
        )
    }
}

export default BirthdayForm

