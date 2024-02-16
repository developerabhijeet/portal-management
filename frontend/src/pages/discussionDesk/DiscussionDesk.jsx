import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const DiscussionDesk = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout newIndex="6">
        <div className="container mt-4 p-4">
          <div className="justify-content-end d-flex ">
            <Button onClick={() => navigate("new")} variant="outline-info">
              New Discussion
            </Button>
          </div>
          <div className="my-4 p-2 bg">
            <h3 className="px-2 py-3 m-0 text-brand">Discussion Desk</h3>
            <div>
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
