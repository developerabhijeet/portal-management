import React from "react";
import Header from "../../Header/Header";
import Table from "react-bootstrap/Table";
import { MdEdit, MdLogin } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export const EditSkills = () => {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3
          style={{ backgroundColor: "#616161", margin: 0, padding: "5px 16px" }}
        >
          All Skills
        </h3>
        <div
          style={{
            padding: "16px 16px 0",
            backgroundColor: "#212529",
            margin: 0,
          }}
        >
          <Table hover variant="dark">
            <thead>
              <tr>
                <th>Beginner</th>
                <th>Intermediate</th>
                <th>Proficient</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/add-skills">
                    <span
                      style={{
                        backgroundColor: "#337ab7",
                        margin: 0,
                        padding: "5px 10px",
                        borderRadius: 5,
                        cursor: "pointer",
                      }}
                    >
                      <MdEdit style={{ color: "#fff" }} />
                      <span style={{ color: "#fff" }}> Edit</span>
                    </span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
