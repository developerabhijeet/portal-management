import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import "../index.css";
export const MyDailyStatusNew_id = () => {
  const { state } = useLocation();
  const data = state.item;
  return (
    <>
      <Layout>
        <div className="container my-4 p-3" style={{backgroundColor: "#191C24"}}>
          <h2 className="text-heading">Status Update on {data.date}</h2>
          <div className="p-2">
            <ul>
              <li>
                <b>In Time</b>
              </li>
              <li>
                <b>Out Time</b>
              </li>
              <li>
                <b>Total Hours:</b>
              </li>
            </ul>
            <h4 style={{color: "#ccc"}}>Please Find My Status Update:</h4>
            <ul>
              <span>
                <ul>
                  {data.tasks.map((task, index) => (
                    <li key={index}>
                      <span>
                        <b>1: Project Name:</b> {task.projectStatus}
                      </span>
                      <br />
                      <b>Tasks:</b>
                      <br />
                      <div>
                        <div>
                          {task.task}
                          <br />
                        </div>
                        <div>
                          <b>Working Hour:</b> {task.workingHour}
                        </div>
                        <div>
                          <b>Status:</b> {task.status}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </span>
              <br />
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};
