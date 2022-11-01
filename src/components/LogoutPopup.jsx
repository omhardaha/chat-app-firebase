import { signOut } from 'firebase/auth'
import React from 'react'
import { CgLogOut } from "react-icons/cg"
import { auth } from '../firbase'
import { GrClose } from 'react-icons/gr'

export default function LogoutPopup({ setlogoutpop }) {
    return (
        <div className='z-10 drop-shadow-md text-center text-sm fixed right-0 bg-white w-60 rounded-lg right-2'>
            <span className='float-right m-2 p-1   text-red-200 hover:bg-gray-200 rounded-full'>
                <GrClose onClick={() => { setlogoutpop(false) }} className='' />
            </span>

            <button title='Logout' onClick={() => { signOut(auth) }} className='my-2 border-none p-3 border-2 solid hover:bg-gray-100 rounded-xl'>
                <CgLogOut className="inline text-lg mr-1" /><span className=' text-sm'>Logout</span>
            </button>
        </div>
    )
}
