import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Layout/Layout.css'
import Header from "../Attendance/Header/Header";
export default function Layout({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const localToken = localStorage.getItem("jwtToken");
    if (!localToken) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <>
    <Header/>
      <div className="layout"> {children}</div>
    </>
  );
}
