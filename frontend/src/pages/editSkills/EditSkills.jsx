import React from "react";
import Table from "react-bootstrap/Table";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
export const EditSkills = () => {
  return (
    <>
      <Layout>
        <div className="container mt-4">
          <h3
            style={{
              backgroundColor: "#515151",
              margin: 0,
              padding: "5px 16px",
            }}
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
                        <MdEdit className="text-white" />
                        <span className="text-white"> Edit</span>
                      </span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  );
};
