import React, { useContext, useState } from 'react'
import { AiOutlineSend } from "react-icons/ai"
import { BiLoaderAlt } from "react-icons/bi"
import { BsImage } from "react-icons/bs"
import { MdDelete } from "react-icons/md"
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firbase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuid } from "uuid";

export default function Input() {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(null);

    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)


    const handleSend = async () => {
        if (!img && text === "") return
        let curText = text;
        setText("");

        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            setLoading(true)
            uploadTask.on(
                (error) => {
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text: curText,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                        setLoading(false)
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: curText,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text: curText,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text: curText,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setImg(null);
    };
    return (
        <>
            {img && <div style={{
                position: "absolute", bottom: "68px",
                  padding: "5px", right: "5px"
            }} className='drop-shadow-xl bg-transparent '>
                {img && <>
                    <img className='drop-shadow-xl float-right h-28' src={img ? URL.createObjectURL(img) : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="" />
                    <MdDelete onClick={() => { setImg(null) }} className="fixed text-red-500 text-2xl cursor-pointer hover:text-red-600 rounded-lg bg-white" />
                </>}
            </div>}
            <div className='flex bg-white mb-4 md:mb-0'>
                <input value={text} onKeyDown={(e) => { if (e.keyCode === 13) { handleSend() } }} onChange={(e) => setText(e.target.value)} type="text" placeholder='New Message' className='p-3 w-full' />
                <div className='flex items-center gap-4 mx-2'>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        id="file"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    <label htmlFor="file">
                        <BsImage className='hover:text-blue-300 cursor-pointer' />
                    </label>

                    <button onClick={handleSend}>
                        {!loading ? <span className=' '><AiOutlineSend className={`md:text-2xl text-4xl hover:text-blue-300 ${(text === "" && !img) && " text-gray-300"}`} /></span> :
                            <BiLoaderAlt className='text-2xl hover:text-blue-300 animate-spin' />}
                    </button>
                </div>
            </div >
        </>
    )
}
