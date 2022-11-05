
import React, { useContext, useEffect } from 'react'
// import { CgLogOut } from "react-icons/cg"
// import { auth } from '../firbase'
import { GrClose } from 'react-icons/gr'
import { io } from "socket.io-client";
import { ChatContext } from '../Context/ChatContext';


export default function VideoChat({ setVideoChat }) {
    const { data } = useContext(ChatContext)

    useEffect(() => {

        const socket = io("http://localhost:4000/");
        // send a message to the server
        socket.on("con", ar => console.log("--+>" + ar));

        if (data.chatId) socket.emit("join-room", data.chatId);

        // receive a message from the server
        socket.on("user-connected", (user) => {
            console.log("something " + user);
        });

    }, [data])

    return (
        <div className='z-10 drop-shadow-md text-center text-sm fixed right-0 bg-white w-60 rounded-lg right-2'>
            <span className='float-right m-2 p-1   text-red-200 hover:bg-gray-200 rounded-full'>
                <GrClose onClick={() => { setVideoChat(false) }} className='' />
            </span>

            <div>
                ergrh
                <button onClick={() => {

                }}>click</button>
            </div>
        </div>
    )
}
