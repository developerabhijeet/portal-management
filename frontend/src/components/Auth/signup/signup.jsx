import React, { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios";
import "../auth.css";
import { BaseURL } from "../../../Utils/utils";
const Signup = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  });
  const [registrationData, setRegistrationData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BaseURL}/users/signup`,
        registrationData
      );
      if (response.data) {
        localStorage.setItem("jwtToken", response.data.token);
        navigate("/");
      } else {
        alert("Username and/or password are incorrect");
      }
    } catch (error) {
      alert("Registration error", error);
    }
    setRegistrationData({ email: "", password: "", username: "" });
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }} className={"body"}>
        <div className="log-in-form ">
          <div className={"log-in-form2"}>
            <div>Signup</div>
          </div>
          <br />
          <form onSubmit={handleLoginSubmit}>
            <div className={"email-custom input"}>
              <input
                className={"inputBox"}
                type="text"
                name="email"
                placeholder="Email"
                value={registrationData.email}
                onChange={handleRegistrationChange}
                required
              />
            </div>
            <div className={"email-custom input"}>
              <input
                className={"inputBox"}
                type="text"
                name="username"
                placeholder="Username"
                value={registrationData.username}
                onChange={handleRegistrationChange}
                required
              />
            </div>
            <div className={"email-custom input"}>
              <input
                className={"inputBox"}
                type="password"
                name="password"
                placeholder="Password"
                value={registrationData.password}
                onChange={handleRegistrationChange}
                required
              />
            </div>
            <div className={"log-in-btn"}>
              <button type="submit " className={"inputButton"}>
                Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
