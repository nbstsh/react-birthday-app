import React, { Component } from 'react'
import manager from '../../js/person-manager'

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: '',
            date: '',
            name: ''
        }
    }
    handleMonthChange = (e) => {
        const { value } = e.target
        let month

        if (!value) {
            month = ''
        } else {
            month = Number(value)
            if (month < 1) month = 12 
            if (month > 12) month = 1
        }

        this.setState({ month })
        manager.setFilters({ month })
    }   
    handleDateChange = (e) => {
        const { value } = e.target
        let date 

        if (!value) {
            date = ''
        } else {
            date = Number(value)
            if (date < 1) date = 31
            if (date > 31) date = 1
        }

        this.setState({ date })
        manager.setFilters({ date })
    }
    handleNameChange = (e) => {
        const { value } = e.target
        this.setState({ name: value })
        manager.setFilters({ name: value })
    }
    handleResetClick = () => {
        const emptyFilter = {
            month: '',
            date: '',
            name: ''
        }

        this.setState(emptyFilter)
        manager.setFilters(emptyFilter)
    }
    render() {
        return(
            <div className='search-field'>

                <input 
                    type='number' 
                    name='month' 
                    placeholder='month' 
                    value={this.state.month}
                    onChange={this.handleMonthChange}/>

                <input 
                    type='number' 
                    name='date' 
                    placeholder='date' 
                    value={this.state.date}
                    onChange={this.handleDateChange} />

                <input 
                    type='text' 
                    name='name' 
                    placeholder='name' 
                    value={this.state.name}
                    onChange={this.handleNameChange}/>

                <button onClick={this.handleResetClick}>reset</button>
            </div>
        )
    }
}

export default SearchField