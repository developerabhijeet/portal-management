import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Layout.css";
import Header from "../Header/Header";
export default function Layout({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <>
      <Header />
      <div className="layout"> {children}</div>
    </>
  );
}
