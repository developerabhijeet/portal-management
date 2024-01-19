import React, { useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import axios from "axios"
import '../auth.css'
import { BaseURL } from "../../../Utils/utils";
const Login = (props) => {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BaseURL}/auth/login`, loginData);
            if (response.data) {
                localStorage.setItem("jwtToken", response.data.token);
                localStorage.setItem("role", response.data.user.role);
                localStorage.setItem("username", response.data.user.username);
                navigate("/");
                
            } else {
                alert("Username and/or password are incorrect");
            }
        } catch (error) {
            alert("Login error", error);
        }
        setLoginData({ email: "", password: "" });
    };


    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        navigate("/login");
    };
    return (
        <div style={{display:"flex",alignItems:"center"}} className={"body"}>
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
                    <Link to="/forgot-password">Forgot Password?</Link>
                   
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