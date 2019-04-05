import React, { Component } from 'react'
import '../styles/components/body.scss'
import BirthdayCardList from './BirthdayCardList'


class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {  
        return (
            <div className='body'>
                <BirthdayCardList listItems={this.props.people} />
            </div>
        )
    }
}

export default Body