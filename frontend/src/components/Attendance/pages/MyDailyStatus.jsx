import React, { useEffect, useState } from "react";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../../Utils/utils";
import Layout from "../../Layout/Layout";
import Header from "../Header/Header";
export const MyDailyStatus = ({}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const username =localStorage.getItem("username");
  useEffect(() => {
    const localToken = localStorage.getItem("jwtToken");
    if (!localToken) {
      navigate("/login");
      return;
    }},[])
  useEffect(() => {
    const Get_Daily_Status = async () => {
      try {
        const response = await axios
          .get(`${BaseURL}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setData(res.data));
      } catch (error) {
        alert(error);
      }
    };
    Get_Daily_Status();
  }, []);
  const handleNavigate = (item) => {
    navigate("/daily_status_updates_details/", {
      state: {
        item,
      },
    });
  };
  return (
    <>
    <Layout>
 <div>
      <h4>All Status</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status Date</th>
            <th>In-Time</th>
            <th>In-Out</th>
            <th>Total Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.user.username}</td>
                    <td>{item.dueDate}</td>
                    <td></td>
                    <td></td>
                    <td>:</td>
                    <td>
                      <div>
                        <button
                          className="eyeicon"
                          onClick={() => handleNavigate(item)}
                        >
                          Show{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
    </Layout>
    </>
  );
};
