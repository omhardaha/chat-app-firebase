import React from 'react'
import { useState } from 'react'
import { db } from "../firbase"
import { collection, updateDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where, } from "firebase/firestore";
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { IoIosSearch } from "react-icons/io"
import { AiOutlineEnter } from "react-icons/ai"
import { RiLoader5Fill } from "react-icons/ri"

export default function Search() {
    const { dispatch } = useContext(ChatContext);
    const [userText, setUserText] = useState("")
    const [userData, setUserData] = useState({})
    const [err, setErr] = useState("")
    const [activeInput, setActiveInput] = useState(false)
    const [loading, setLoading] = useState(false)

    const { currentUser } = useContext(AuthContext)
    const handleKey = (e) => {
        e.code === "Enter" && updateUser()
    }

    const updateUser = async (e) => {
        try {
            console.log(userText);
            setLoading(true)
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("displayName", "==", userText))
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length === 0) {
                setUserData({})
                setErr(true)
                setTimeout(() => {
                    setErr(false)
                }, 3000);
            }

            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setUserData(doc.data())
                setErr(false);
            });
            setLoading(false)
            
        } catch (error) {
            setErr(true)
            setTimeout(() => {
                setErr(false)
            }, 3000);
            setLoading(false)
        }
    }

    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > userData.uid
                ? currentUser.uid + userData.uid
                : userData.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: userData.uid,
                        displayName: userData.displayName,
                        photoURL: userData.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", userData.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
            await dispatch({ type: "CHANGE_USER", payload: userData })
            setUserData(null);
            setUserText("")
        } catch (err) { }

    };
    return (
        <>
            <div className='md:mb-6 mb-1 '>
                <div className='relative'>
                    <input onFocus={() => { setActiveInput(true) }} onBlur={() => { setActiveInput(false) }} type="text" placeholder='SEARCH USER' className='bg-white md:text-sm text-xs rounded-full w-full p-3 px-5' value={userText} onChange={e => setUserText(e.target.value)} onKeyDown={e => handleKey(e)} />
                    <span onClick={updateUser} className='h-full overflow-hidden bg-gray-100 hover:bg-gray-300 p-3 right-0 inline rounded-full absolute'>
                        {!loading ? <IoIosSearch className='text-xl' />
                        :<RiLoader5Fill className='animate-spin text-xl'/>}
                    </span>
                </div>

                {activeInput && <div className='hidden md:block text-center text-gray-400 text-sm '>Press Enter To Search<AiOutlineEnter className='inline' /></div>}
                {userData && userData.displayName &&
                    <div className='p-2 pr-8 cursor-pointer my-1 flex overflow-hidden  my-1 rounded-3xl hover:bg-gray-100 bg-white' onClick={handleSelect}>

                        <img style={{ height: "45px", width: "45px", borderRadius: "100%" }} className='inline object-cover h-10 w-10 inline rounded-full ' src={userData.photoURL} alt="" />

                        <div className='inline mx-3 my-auto text-black-400'>
                            <div > {userData.displayName}</div>
                        </div>
                    </div>
                }


                {err && <div className='p-2 pr-8 cursor-pointer my-1 overflow-hidden my-1 rounded-3xl hover:bg-gray-100 bg-white' >

                    <div className='text-center mx-3 my-2 text-black-400'>
                        <div >No User Found</div>
                    </div>
                </div>}
            </div>
        </>
    )
}
