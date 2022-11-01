import React from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useState } from 'react';
import { db } from '../firbase';
import { useEffect } from 'react';
import { VscLoading } from "react-icons/vsc"
import ChatInSidebar from './ChatInSidebar';
import { ChatContext } from '../Context/ChatContext';

export default function Chats() {
    const [chats, setChats] = useState([])
    const [Loading, setLoading] = useState(true)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            setLoading(true)
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())

                if (data.chatId === "null") {
                    if (chats) {
                        if (Object.entries(doc.data()).length > 0) {
                            console.log(Object.entries(doc.data())[0][1]);
                            dispatch({ type: "CHANGE_USER", payload: Object.entries(doc.data())[0][1].userInfo })
                        }
                    }
                }
                setLoading(false)
            });
            return () => {
                setLoading(false)
                unsub()
            }
        }
        currentUser.uid && getChats()
    }, [currentUser.uid])

    return (
        <>{Loading ? <> <div className="text-center h-96 my-auto flex  justify-center items-center align-center">
            <VscLoading className="text-6xl text-gray-300 animate-spin inline" />
        </div></> :

            <div style={{maxHeight:"65vh"}} className='overflow-y-scroll h-max md:mt-4 rounded-3xl p-3 bg-white '>
                <div>

                {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <ChatInSidebar key={chat[0]} data={chat} />
                    ))}
                    </div>

                {chats && (Object.entries(chats).length === 0) && <p className='text-gray-400 text-sm '>No User</p>}
            </div>

        }
        </>
    )
}
