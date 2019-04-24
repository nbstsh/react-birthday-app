import React, { useState } from 'react'
import DeleteAccountForm from './DeleteAccountForm'
import Signout from './Signout'
import Return from './Return'

const SignoutContainer = ({ closeModal }) => {
    const [needDeleteForm, setNeedDeleteForm] = useState(false)
    const openDeleteForm = () => setNeedDeleteForm(true)
    const closeDeleteForm = () => setNeedDeleteForm(false)

    const form = needDeleteForm ? (
        <DeleteAccountForm 
            closeDeleteForm={closeDeleteForm} 
            handleAfterSubmit={closeModal} /> 
    ) : (
        <Signout 
            openDeleteForm={openDeleteForm}
            handleAfterSubmit={closeModal} /> 
    )

    return (
        <React.Fragment>
            {form}
            <Return text='Go back to birthday card list' handleReturnClick={closeModal}/>
        </React.Fragment>
    )
    
    
    
    
}


export default SignoutContainer