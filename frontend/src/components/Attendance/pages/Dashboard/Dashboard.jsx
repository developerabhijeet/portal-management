import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "../../dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const localToken = localStorage.getItem("jwtToken");
    if (!localToken) {
      navigate("/login");
      return;
    } else {
      navigate("/");
      return;
    }
  }, []);
  return (
    <>
      <Header />
      <div className="dashboard_header"> </div>
    </>
  );
};

export default Dashboard;
