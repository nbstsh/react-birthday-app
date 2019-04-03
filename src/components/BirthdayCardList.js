import React, { Component } from 'react'
import BirthdayCard from './BirthdayCard'
import uuidv4 from 'uuidv4'

class BirthdayCardList extends Component {
    constructor(props) {
        super(props) 
        this.state = {}
    }
    render() {
        return (
            <ul>
                {this.props.listItems.map(item => (
                    <li key={uuidv4()}>
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