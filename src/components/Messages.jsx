import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react'
import { VscLoading } from "react-icons/vsc"
import { ChatContext } from '../Context/ChatContext'
import { db } from '../firbase';
import Message from "./Message"

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [Loading, setLoading] = useState(true);
    const { data } = useContext(ChatContext)

    useEffect(() => {
        setLoading(true)
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
            setLoading(false)
        });
        return () => {
            unSub();
        };
    }, [data.chatId]);


    useEffect(() => {
        document.getElementById("message-box")?.scrollIntoView({ behavior: "smooth", block: 'center' });
        let audio = new Audio("/ring.mp3");
        // audio.play()
    }, [messages])

    return (
        <>

            {Loading && <> <div className="text-center h-96 my-auto flex justify-center items-center align-center">
                <VscLoading className="text-6xl text-gray-300 animate-spin inline" />
            </div></>}

            {!Loading && <>
                <div className='transition ease-in-out duration-300 '>
                    <div className='md:mb-3 mb-1 text-white md:p-3 pl-2 rounded-full'>
                        <p style={{ color: "#277BC0" }} className='text-blue-400 md:text-left text-right font-black md:text-4xl text-lg'>{data.user.displayName}</p>
                    </div>

                    <div style={{ maxHeight: "65vh", minHeight: "65vh" }} className='rounded-b-3xl h-full rounded-tr-3xl message-box mb-3 bg-white lg:p-4 md:p-2 p-1 overflow-y-scroll'>
                        {messages.map((messageData) => (
                            <Message key={messageData.id} messageData={messageData} />
                        ))}
                        <div id='message-box' />
                    </div>
                </div>
            </>}
        </>
    )
}
