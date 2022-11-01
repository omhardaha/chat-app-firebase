import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase.js"
import { useNavigate } from "react-router-dom";

import { VscLoading } from "react-icons/vsc"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const user1 = (e) => {
        e.preventDefault();
        setEmail("tony@tony.tony")
        setPassword("tony@tony.tony")
        // setTimeout(() => handleSubmit(e), 1000);
        // handleSubmit(e);
    }
    const user2 = (e) => {
        e.preventDefault();
        setEmail("elon@elon.elon")
        setPassword("elon@elon.elon")
        // setTimeout(() => handleSubmit(e), 1000);
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log(email, password);
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate("/")
                    console.log(user);
                })
                .catch((error) => {
                    setError(true)
                    setLoading(false)
                    console.log(error);
                });
        } catch (error) {
            setError(true)
            setLoading(false)
            console.log(error);
        }
        // setLoading(false)
    }

    return (
        <div style={{
            background: "url('/loginbg.jpg')", backgroundPosition: "center",
            backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh"
        }} className=''>
            <div className='backdrop-blur-lg rounded-lg lg:p-16 '>
                <div className='grid md:grid-cols-2  rounded-3xl'>
                    <div style={{ backgroundColor: "rgb(233 240 255 / 15%)", minHeight: "90vh" }} className='md:p-15 md:p-20 lg:pt-12 hidden md:block '>
                        <img className='mix-blend-multiply  object-cover' src="/chatside1.png" alt="" />
                    </div>
                    <div className='backdrop-blur-lg'>
                        <div style={{ backgroundColor: "rgb(233 240 255 / 15%)", minHeight: "90vh" }} className='w-full bg-stone-100 '>
                            <div className='relative'>
                                {Loading && <> <div className="w-full absolute text-center h-full my-auto flex justify-center items-center align-center">
                                    <VscLoading className="text-6xl text-gray-300 animate-spin inline" />
                                </div></>}{<form autocomplete="off" onSubmit={handleSubmit} className='z-1 flex flex-col lg:mx-12 gap-5 p-10 md:p-15 md:p-20'>
                                    {/* <div className='m-auto mb-12'>
                                        <BsChatRightQuoteFill className='text-5xl inline text-blue-400' />
                                        <span className='text-3xl text-black font-black'> OChat </span>
                                    </div> */}

                                    <h1 className='text-center text-2xl font-bold z-1'>Hellow Again!</h1>
                                    <p className='text-sm text-center font-light text-black'>  We Missed You So Much </p>

                                    <input autocomplete="off" value={email} onChange={(e) => setEmail(e.target.value)} className=' focus:drop-shadow-lg bg-white text-sm tttt rounded-lg w-full p-3 px-5 mt-10' type="email" placeholder='Email' />
                                    <input autocomplete="off" value={password} onChange={(e) => setPassword(e.target.value)} className=' focus:drop-shadow-lg bg-white text-sm rounded-lg w-full p-3 px-5' type="password" placeholder='Password' />
                                    <button style={{ backgroundColor: "rgb(254 107 104)" }} className='bg-white text-sm hover:drop-shadow-xl  drop-shadow-lg rounded-lg w-full text-white p-3 px-5' onClick={handleSubmit}>Sign In</button>

                                    <button style={{ backgroundColor: "rgb(254 107 104)" }} className='bg-white text-sm hover:drop-shadow-xl  drop-shadow-lg rounded-lg w-full text-white p-3 px-5' onClick={user1}>Use Tony Account</button>

                                    <button style={{ backgroundColor: "rgb(254 107 104)" }} className='bg-white text-sm hover:drop-shadow-xl  drop-shadow-lg rounded-lg w-full text-white p-3 px-5' onClick={user2}>Use Elon Account</button>

                                    {error && <p className='bg-white rounded-lg text-center text-sm p-3 px-5 text-red-500'>Oops :  Invalid Credentials</p>}

                                    <span className='text-center text-stone-400 text-sm'>Don't have an Account ?<Link className='text-blue-600  solid text-sm' to={"/register"} > signup</Link></span>
                                </form>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
