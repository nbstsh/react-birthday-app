import React, { useState } from 'react'
import LoaderGif from './LoaderGif'

const userLoader = () => {
    const [needLoader, setNeedLoader] = useState(false) 

    const loader = needLoader ? <LoaderGif /> : null

    return { needLoader, setNeedLoader, loader }
}


export default userLoader