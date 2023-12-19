import React, { useEffect, useState } from 'react'

const Toast = ({ message, type,flag }) => {
    return (
        flag ?
            <div className={`p-4 animate-appearance-in h-20 flex items-center justify-center bottom-5 right-5 ${type="success"?'bg-green-500 text-white':type='warning'?'bg-yellow-500 text-gray-800':'bg-red-500 text-white'} w-60 absolute rounded-md z-50`}>
                <p>{message}</p>
            </div > : <></>
    )
}

export default Toast