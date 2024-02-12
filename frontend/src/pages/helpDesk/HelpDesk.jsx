import React from "react";
import Layout from "../../components/Layout/index";
import { Table } from "react-bootstrap";
export const HelpDesk = () => {
  return (
    <>
      <Layout>
        <div className="bg-dark mt-4 container p-4">
          <h3
            className="px-3 py-2 m-0"
            style={{ backgroundColor: "#191c24", color: "#60c2cf" }}
          >
            HR Help Desk
          </h3>
          <div className="p-0 bg-dark m-0">
            <Table hover style={{ backgroundColor: "#191c24" }}>
              <thead>
                <tr>
                  <th>Query Type</th>
                  <th>TAT to respond</th>
                  <th>TAT for closure</th>
                  <th>1st Escalation Point</th>
                  <th>2nd Escalation Point</th>
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
      </Layout>
    </>
  );
};
