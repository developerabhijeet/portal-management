import React, { useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios"
import '../Login/Login.css'
const Login = (props) => {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const handleLoginChange = (e) => {
        // console.log(e);
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4500/login", loginData);
            if (response.data) {
                console.log(response.data)
                localStorage.setItem("jwtToken", response.data.token);
                localStorage.setItem("isLoggedIn", "true");
                navigate("/");
                
            } else {
                console.log("Username and/or password are incorrect");
            }
        } catch (error) {
            console.error("Login error", error);
        }
        setLoginData({ email: "", password: "" });
    };


    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };
    return (
        <div className={"body"}>
            <div className="log-in-form ">
                <div className={"log-in-form2"}>
                    <div>Log in</div>
                </div>
                <br />
                <form onSubmit={handleLoginSubmit}>
                    <div className={"email-custom input"}>
                        <input
                            className={"inputBox"}
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div className={"email-custom input"}>
                        <input
                            className={"inputBox"}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div className={"log-in-btn"}>
                        <button type="submit " className={"inputButton"}>Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login