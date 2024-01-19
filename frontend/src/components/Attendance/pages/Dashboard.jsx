import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const Dashboard = () => {
  const navigate =useNavigate();
  useEffect(() => {
    const localToken = localStorage.getItem("jwtToken");
    if (!localToken) {
      navigate("/login");
      return;
    }
 
  },[])
  return (
    <>
    <Header/>
        <div style={{height:"100vh", background:"white"}}>Dashboard</div>

    </>
  )
}

export default Dashboard