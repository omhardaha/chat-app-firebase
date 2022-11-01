import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firbase";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })
    }, []);

    return (<AuthContext.Provider value={{ currentUser }}>
        {children}
    </AuthContext.Provider>)
}