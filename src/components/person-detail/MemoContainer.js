import React, { Component } from 'react'
import Memo from './Memo';
import MemoForm from './MemoForm';


class MemoContainer extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            needShowForm: false
        }
    }
    openForm = () => {
        this.setState({ needShowForm: true })
    }
    closeForm = () => {
        this.setState({ needShowForm: false })
    }
    render() {
        const { memo, personId } = this.props
        return (
            <React.Fragment>
                {this.state.needShowForm ? (
                    <MemoForm 
                        memo={memo}
                        personId={personId} 
                        handleAfterSubmit={this.closeForm}/>
                ) : (
                    <Memo 
                        id={memo.id} 
                        content={memo.content}
                        handleClick={this.openForm} />
                )}

            </React.Fragment>
        )
    }
}

export default MemoContainer