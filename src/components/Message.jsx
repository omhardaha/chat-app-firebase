import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext'

export default function Message({ messageData }) {
    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)
    let isMyMessage = messageData.senderId !== currentUser.uid

    return (
        <>
            {
                isMyMessage ?

                    <div className='grid grid-cols-12 gap-3 py-1 my-4'>

                        <div className='text-center lg:col-span-1 col-span-2'>

                            <img title={data.user.displayName} style={{ height: "45px", width: "45px", borderRadius: "100%" }} className='inline object-cover h-10 w-10 inline rounded-full ' src={data.user.photoURL} alt="" />

                            <p style={{ fontSize: "9px", maxWidth: "90%" }} className='mt-1 text-gray-400'>{new Date(messageData.date.seconds * 1000 + messageData.date.nanoseconds / 1000000).toLocaleTimeString()}</p>

                        </div>

                        <div className='col-span-10 w-fit'>

                            <div style={isMyMessage ? { backgroundColor: "rgb(201 204 208 / 41%)", color: "black" } : { backgroundColor: "#FFCB42" }} className='py-5 px-4 rounded-b-xl rounded-tr-xl mt-1'>
                                <span>{messageData?.text}
                                    {messageData.img && <img src={messageData.img} alt="" className='max-h-40 object-contain mt-4 mb-1' />}
                                </span>
                            </div>
                        </div>

                    </div>

                    :
                    <div className='flex justify-end gap-3 py-1 my-4'>

                        <div style={{ backgroundColor: "#277BC0", color: "white", float: 'right' }} className=' py-6 px-4 rounded-b-xl rounded-tl-xl  mt-1'>
                            <span>{messageData?.text}
                                {messageData.img && <img src={messageData.img} alt="" className='max-h-40 object-contain mt-4 mb-1' />}
                            </span>
                        </div>

                        <div className='hidden md:block'>
                            <img title={currentUser.displayName} style={{ height: "45px", width: "45px", borderRadius: "100%" }} className=' object-cover h-10 w-full inline md:rounded-full ' src={currentUser.photoURL} alt="" />
                            <p style={{ fontSize: "9px", maxWidth: "90%" }} className='mt-1 text-gray-400 text-right'>{new Date(messageData.date.seconds * 1000 + messageData.date.nanoseconds / 1000000).toLocaleTimeString()}</p>
                        </div>

                    </div>
            }
        </>
    )
}
