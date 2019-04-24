import React, { useState } from 'react'
import DeleteAccountForm from './DeleteAccountForm'
import Signout from './Signout'

const SignoutContainer = ({ closeModal }) => {
    const [needDeleteForm, setNeedDeleteForm] = useState(false)
    const openDeleteForm = () => setNeedDeleteForm(true)
    const closeDeleteForm = () => setNeedDeleteForm(false)

    return needDeleteForm ? (
            <DeleteAccountForm 
                closeDeleteForm={closeDeleteForm} 
                handleAfterSubmit={closeModal} /> 
        ) : (
            <Signout 
                openDeleteForm={openDeleteForm}
                handleAfterSubmit={closeModal} /> 
        )
}


export default SignoutContainer