import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";

export const DiscussionDesk = () => {
  return (
    <>
      <Layout>
        <div className="bg-dark mt-4 container p-0">
          <h3 className="px-3 py-2 m-0" style={{ backgroundColor: "#515151" }}>
            Discussion Desk
          </h3>
          <div className="p-3 bg-dark m-0">
            <Table hover variant="dark">
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
      </Layout>
    </>
  );
};
