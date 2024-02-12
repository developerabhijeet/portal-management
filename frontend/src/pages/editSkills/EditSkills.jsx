import React from "react";
import Table from "react-bootstrap/Table";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button } from "react-bootstrap";
export const EditSkills = () => {
  return (
    <>
      <Layout newIndex="5">
        <div className="container mt-5">
          <h3 className="bg text-brand px-3 py-2 m-0">All Skills</h3>
          <div className="bg p-4">
            <Table hover>
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
                      <Button variant="outline-success">
                        <MdEdit className="text-white" />
                        Edit
                      </Button>
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
