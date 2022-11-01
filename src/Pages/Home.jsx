import React, { useContext } from 'react'
import Navbar from "../components/Navbar"
import Search from "../components/Search"
import { BsChatRightQuoteFill } from "react-icons/bs"
import Chats from "../components/Chats"
import Messages from '../components/Messages'
import Input from '../components/Input'
import { IoCloudOfflineOutline } from "react-icons/io5"

import { Offline } from "react-detect-offline";
import { ChatContext } from '../Context/ChatContext'

export default function Home() {
    const { data } = useContext(ChatContext);

    return (
        <>
            <Offline>
                <h1 className='fixed right-0 top-0 text-right text-sm mr-1 text-gray-500'>  <IoCloudOfflineOutline className='inline animate-ping text-xs mr-2' /> No Connection</h1>
            </Offline>
            <Navbar />

            {/* <div>
            </div> */}

            {/* <div>edfve</div> */}

            <div className=' lg:mx-10 grid-cols-6 md:grid gap-2 mx-2'>
                <div className='md:col-span-2 col-span-1'>
                    <Search />
                    <Chats />
                </div>

                {data.user.displayName ? <div className='col-span-4 relative bg-transparent flex flex-col justify-between'>

                    <Messages />
                    <Input />
                </div> : <>
                    <div className='col-span-4'>
                        <div className="text-center flex-col h-96 my-auto flex justify-center items-center align-center">
                            <div>
                            <BsChatRightQuoteFill className="text-7xl text-gray-300 animate-bounce " />

                            </div>
                            <p className='text-gray-400 text-xl mt-6'>Select A Chat</p>
                        </div>
                    </div>
                </>}
            </div>

        </>
    )
}
