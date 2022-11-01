import React from 'react'
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';

export default function ChatInSidebar({ data }) {

    const { dispatch } = useContext(ChatContext);

    return (
        data &&
        <div style={{ borderBottom: "1px solid #b0dbff78" }} onClick={() => dispatch({ type: "CHANGE_USER", payload: data[1].userInfo })} className='md:p-2 cursor-pointer my-5 ml-1 rounded-3xl inline md:flex overflow-hidden hover:bg-gray-100 '>

                <img style={{height:"45px",width:"45px",borderRadius:"100%"}} className='inline object-cover inline rounded-full ' src={data[1].userInfo?.photoURL || "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="" />
           
            <div className='hidden md:inline mx-3'>
                {/* <div > e{data.docs.displayName}</div> */}
                <div className='font-bold truncate'>{data[1].userInfo?.displayName} </div>
                {data[1].lastMessage && <div className='text-xs text-gray-400 font-light truncate'>{data[1].lastMessage.text} </div>}
            </div>

        </div>
    )
}
