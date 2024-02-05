import React, { useState } from "react";
import Layout from "../../components/Layout";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const MyLeave = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const navigate = useNavigate()
  const leaveType = ["Paid Leave", "Comp Off", "Optional Leave", "Casual Leave"]

  return (
    <>
      <Layout>
        <div className="container">
          <DropdownButton
            variant="secondary"
            title="Apply Leaves"
            className="my-4 d-flex justify-content-end"
            menuVariant="dark"
          >
            {leaveType.map((type)=>{
              return<Dropdown.Item key={type} onClick={()=>navigate("new", {state: type})} >{type}</Dropdown.Item>
            })}
          </DropdownButton>
          <div className="bg-dark p-3 d-flex justify-content-between mb-4">
            <h3 className="m-0">Leave Balance</h3>
            <h3 className="m-0 me-4 pe-5">0.0</h3>
          </div>
          <div className="bg-dark mb-4">
            <h3
              className="px-3 py-2 m-0"
              style={{ backgroundColor: "#515151" }}
            >
              Alloted Balance
            </h3>
            <div className="p-3 bg-dark m-0">
              <Table hover variant="dark">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Credit</th>
                    <th>Leave</th>
                    <th>Loss</th>
                    <th>Penalty</th>
                    <th>Compoff</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="bg-dark">
            <h3
              className="px-3 py-2 m-0"
              style={{ backgroundColor: "#515151" }}
            >
              All Leaves of {firstName} {lastName}
            </h3>
            <div className="p-3 bg-dark m-0">
              <Table hover variant="dark">
                <thead>
                  <tr>
                    <th>Applied By</th>
                    <th>Leave</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
