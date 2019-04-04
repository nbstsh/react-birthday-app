import React, { Component } from 'react'
import BirthdayCard from './BirthdayCard'

class BirthdayCardList extends Component {
    constructor(props) {
        super(props) 
        this.state = {}
    }
    render() {
        return (
            <ul>
                {this.props.listItems.map(item => (
                    <li key={item.id}>
                        <BirthdayCard
                            month={item.month}
                            date={item.date}
                            name={item.name} />
                    </li> 
                ))}

            </ul>
        )
    }
}

export default BirthdayCardList