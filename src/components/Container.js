import React, { Component } from 'react'
import '../styles/components/container.scss'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='container'>
                <div className='container__top header'>header</div>
                <div className='container__middle content'>content</div>
                <div className='container__bottom footer'>footer</div>
            </div>
        )
    }
}

export default Container