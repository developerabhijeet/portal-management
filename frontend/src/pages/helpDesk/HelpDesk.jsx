import React from "react";
import Layout from "../../components/Layout/index";
import { Table } from "react-bootstrap";
export const HelpDesk = () => {
  return (
    <>
      <Layout>
        <div className="bg-dark mt-4 container p-0">
          <h3 className="px-3 py-2 m-0" style={{ backgroundColor: "#515151" }}>
            HR Help Desk
          </h3>
          <div className="p-3 bg-dark m-0">
            <Table hover variant="dark">
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
