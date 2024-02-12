import React from "react";
import Layout from "../../components/Layout/index";
import { Table } from "react-bootstrap";
export const HelpDesk = () => {
  return (
    <>
      <Layout newIndex="6">
        <div className="mt-5 container p-4">
          <h3
            className="px-3 py-2 m-0"
            style={{ backgroundColor: "#191c24", color: "#60c2cf" }}
          >
            HR Help Desk
          </h3>
          <div>
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
