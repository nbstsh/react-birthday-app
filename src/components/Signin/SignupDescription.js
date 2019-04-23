import React, { useState } from 'react'

const SignupDescription = () => {
    return (
        <React.Fragment>
            <p className='signin__description'>This app allow you to register birthday of your friends, family, or somebody important to you. You can also write memos about the person. Enjoy adding birthday card!</p>
            <p className='signin__description'>You can use this app without sign up. But your data will be stored in your device, so you might lose the data if your brower clean it up. If you don't want it to happen, please sign up! Once you sign up, your data is going to be stored in cloud service and you don't need to worry about forgetting birthdays anymore! </p>
        </React.Fragment>
    )
}

export default SignupDescription