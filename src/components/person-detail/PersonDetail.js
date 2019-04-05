import React, { Component } from 'react'
import '../../styles/components/person-detail.scss'
import PersonDetailHeader from './PersonDetailHeader'
import PersonDetailBody from './PersonDetailBody';
import PersonDetailFooter from './PersonDetailFooter';

class PersonDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { id, month, date, name, memos } = this.props.person 

        return (
            <div className='person-detail'>
                <PersonDetailHeader name={name}/>
                <PersonDetailBody />
                <PersonDetailFooter />
            </div>
        ) 
    }
}

export default PersonDetail;