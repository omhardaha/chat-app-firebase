import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {storage, db } from "../firbase.js"

import { VscLoading } from "react-icons/vsc"
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setdisplayName] = useState("");
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("Oops :  Invalid Credentials");
    const [mediaPreview, setMediaPreview] = useState("https://freesvg.org/img/abstract-user-flat-4.png");
    const [file, setFile] = useState();
    const navigate = useNavigate()

    const handleChange = (e) => {

        const {  files } = e.target;
        if (files.length === 0) {
            setFile("./account.png");
            setMediaPreview("https://freesvg.org/img/abstract-user-flat-4.png")
        } else {
            setFile(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setErrorText('Please Select A Profile Iamge.');
            setError(true)
            return
        }
        if(errorText === 'Please Select A Profile Iamge.')setErrorText('Oops :  Invalid Credentials.');
        setLoading(true)
        const auth = getAuth();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res);
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
            // const uploadTask = uploadBytesResumable(storageRef, file);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setError(true)
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            console.log(err.message);
            if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                setErrorText('Password must be at least 6 characters.');
            }
            if (err.message === 'Firebase: Error (auth/invalid-email).') {
                setErrorText('The Email is invalid.');
            }
            if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
                setErrorText('The Email is already used.');
            }
            setError(true);
            setLoading(false);
        }
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
                            <div>
                                {Loading && <> <div className="w-full absolute text-center h-full my-auto flex justify-center items-center align-center">
                                    <VscLoading className="text-6xl text-gray-300 animate-spin inline" />
                                </div></>}
                                <form onSubmit={handleSubmit} className='flex flex-col lg:mx-12 gap-5 p-10 md:p-15 md:p-20'>
                                    {/* <div className='m-auto mb-12'>
                                        <BsChatRightQuoteFill className='text-5xl inline text-blue-400' />
                                        <span className='text-3xl text-black font-black'> OChat </span>
                                    </div> */}

                                    <h1 className='text-center text-2xl font-bold'>Create Your Account</h1>

                                    <div className='  flex flex-col items-center justify-center  p-2 '>

                                        <span className='relative'>
                                            <label htmlFor="image-up" className=" inline">
                                                <img className="active:bg-gray-300 hover:bg-gray-100 p-4 h-32 w-32 border-2 rounded-full" alt='om' src={mediaPreview || "https://freesvg.org/img/abstract-user-flat-4.png"} ></img>
                                            </label>
                                        </span>
                                    </div>


                                    <input

                                        id="image-up"
                                        type="file"
                                        onChange={handleChange}
                                        name="media"
                                        className="hidden" />



                                    <input value={email} onChange={(e) => setEmail(e.target.value)} className=' focus:drop-shadow-lg bg-white text-sm tttt rounded-lg w-full p-3 px-5 ' type="email" placeholder='Email' />
                                    <input value={displayName} onChange={(e) => setdisplayName(e.target.value)} className=' focus:drop-shadow-lg bg-white text-sm rounded-lg w-full p-3 px-5' type="text" placeholder='User Name' />



                                    <input value={password} onChange={(e) => setPassword(e.target.value)} className=' focus:drop-shadow-lg bg-white text-sm rounded-lg w-full p-3 px-5' type="password" placeholder='Password' />
                                    {error && <p className='bg-white rounded-lg text-center text-sm p-3 px-5 text-red-500'>{errorText}</p>}
                                    <button style={{ backgroundColor: "rgb(254 107 104)" }} className='bg-white text-sm hover:drop-shadow-xl drop-shadow-lg rounded-lg w-full text-white p-3 px-5' onClick={handleSubmit}>Signup</button>

                                    <span className='text-ceznter text-stone-400 text-sm'>Already have an Account ?<Link className='text-blue-600  solid text-sm' to={"/login"} > login</Link></span>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
