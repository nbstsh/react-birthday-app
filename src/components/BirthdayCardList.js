import React, { Component } from 'react'
import '../styles/components/birthday-card.scss'
import BirthdayCard from './BirthdayCard'

class BirthdayCardList extends Component {
    constructor(props) {
        super(props) 
        this.state = {}
    }
    render() {
        return (
            <ul className='birthday-card__list'>
                {this.props.listItems.map(item => (
                    <li key={item.id}>
                        <BirthdayCard
                            id={item.id}
                            month={item.month}
                            date={item.date}
                            name={item.name} 
                            setSelectedPersonId={this.props.setSelectedPersonId} />
                    </li> 
                ))}

            </ul>
        )
    }
}

export default BirthdayCardList