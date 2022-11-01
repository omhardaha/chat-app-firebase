import React from 'react'
import { GrClose } from 'react-icons/gr'

export default function Notification({ setNotification }) {
    return (
        <div on onBlur={() => { setNotification(false) }}  className='z-10 drop-shadow  rounded-lg text-sm fixed right-0 bg-white w-60 h-80 right-2'>
            <span className='float-right m-2 p-1   text-red-200 hover:bg-gray-200 rounded-full'>
                <GrClose onClick={() => { setNotification(false) }} className='' />
            </span>
            <h1 className='text-center my-2'>Notifications</h1>
            <div className='text-gray-400 h-full m-auto flex justify-center align-center items-center'>
                <span>
                    No Notifications
                </span>
            </div>
        </div>
    )
}
