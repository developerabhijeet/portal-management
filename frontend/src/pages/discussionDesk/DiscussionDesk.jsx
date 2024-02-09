import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const DiscussionDesk = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <div className="container mt-4">
          <div className="justify-content-end d-flex ">
            <Button onClick={() => navigate("new")} variant="outline-primary">
              New Discussion
            </Button>
          </div>

          <div className="bg-dark my-4">
            <h3
              className="px-3 py-2 m-0"
              style={{ backgroundColor: "#292b3a" }}
            >
              Discussion Desk
            </h3>
            <div className="p-3 bg-dark m-0">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Detail</th>
                    <th>DueDate</th>
                    <th>TalkWith</th>
                    <th>Status</th>
                    <th>Action</th>
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
        </div>
      </Layout>
    </>
  );
};
