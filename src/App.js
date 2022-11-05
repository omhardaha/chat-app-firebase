import React from "react";
import "./style.scss";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

import {
    BrowserRouter, 
    Route,
    Routes,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {

    const { currentUser } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ currentUser ? <Home /> : <Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
