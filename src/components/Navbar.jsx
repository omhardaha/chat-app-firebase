import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { BsChatRightQuoteFill ,BsFillCameraVideoFill} from "react-icons/bs"
import { MdNotifications } from "react-icons/md"
import { AuthContext } from '../Context/AuthContext'
import Notification from './Notification'
import LogoutPopup from './LogoutPopup'
import VideoChat from './VideoChat'

export default function Navbar() {
    const { currentUser } = useContext(AuthContext)
    const [notification, setNotification] = useState(false)
    const [logoutpop, setlogoutpop] = useState(false)
    const [videoChat, setVideoChat] = useState(false)
    return (
        <>
            <div className="col-span-6 my-2 md:mt-4  lg:mx-10 flex justify-between px-10" >
                <div>
                    <BsChatRightQuoteFill className='text-xl inline text-blue-400' />
                    <span className='text-lg text-black font-bold'> OChat </span>
                </div>

                <div className='flex items-center'>
                    
                    {/* <div className='p-1 ml-2 hover:bg-gray-200 rounded-full'>
                        <BsFillCameraVideoFill onClick={() => {
                            if (logoutpop) setVideoChat(false)
                            setVideoChat(!videoChat)
                        }} className=' text-xl ' />
                    </div> */}

                    <div className='p-1 ml-2 hover:bg-gray-200 rounded-full'>
                        <MdNotifications onClick={() => {

                            if (logoutpop) setlogoutpop(false)
                            setNotification(!notification)

                        }} className=' text-xl ' />
                    </div>
                    <div className='hover:bg-gray-200 rounded-full p-1 ml-1'>
                        <img onClick={() => {
                            if (notification) setNotification(false)
                            setlogoutpop(!logoutpop) }} className=' object-cover rounded-full h-6 w-6 inline  ' src={currentUser && currentUser.photoURL} alt="" />
                    </div>
                </div>
            </div >
            <>
                {notification && <Notification setNotification = {setNotification}/>}
                {logoutpop && <LogoutPopup setlogoutpop = {setlogoutpop}/>}
                {! videoChat && <VideoChat setVideoChat = {setVideoChat}/>}
            </>
        </>
    )
}
