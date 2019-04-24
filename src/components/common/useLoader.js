import React, { useState } from 'react'
import LoaderGif from './LoaderGif'

const userLoader = () => {
    const [needLoader, setNeedLoader] = useState(false) 

    const Loader = () => {
        return needLoader ? <LoaderGif /> : null
    }

    return { needLoader, setNeedLoader, Loader}
}


export default userLoader