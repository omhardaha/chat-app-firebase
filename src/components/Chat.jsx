import React from 'react'

export default function Chat({ data }) {
    return (
        data &&
        <div className='p-2 pr-8 cursor-pointer my-1 flex overflow-hidden hover:bg-gray-400'>

            <img className='inline object-cover h-10 w-10 inline rounded-full ' src={data[1].userInfo.photoURL} alt="" />

            <div className='inline mx-3'>
                {/* <div > e{data.docs.displayName}</div> */}
                <div className='text-sm truncate'>{data[1].userInfo.displayName} </div>
            </div>

        </div>
    )
}
