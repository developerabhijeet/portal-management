import React from "react";
import Layout from "../../components/Layout";
import Table from "react-bootstrap/Table";
const Holidays = () => {
  const newDate = new Date();
  const currentYear = newDate.getFullYear();
  return (
    <>
      <Layout>
        <div className="container mt-4 p-0">
          <h3 className="px-3 py-2 m-0" style={{ backgroundColor: "#515151" }}>
            Holiday Calendar <span>{currentYear}</span>
          </h3>
          <div className="p-3 bg-dark m-0">
            <Table hover variant="dark">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Occassion</th>
                  <th>Days</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="container mt-4 bg-dark p-3">
          <h3>Note</h3>
          <ol>
            <li>
              For the year {currentYear}, There would be 1 optional holiday that
              can be used only on any of the festival day.
            </li>
            <li>Need to apply 15 days prior.</li>
          </ol>
        </div>
      </Layout>
    </>
  );
};
export default Holidays;
