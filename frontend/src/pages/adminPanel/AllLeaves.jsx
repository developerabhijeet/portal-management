import React, { useState } from "react";
import Layout from "../../components/Layout";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./allleaves.css";

export const AllLeaves = () => {
  const [isApproved, setIsApproved] = useState(false)
  const [isDenied, setIsDenied] = useState(false)
  return (
    <>
      <Layout newIndex="6">
        <div className="container">
          <h3 className="my-4 bg p-2 text-brand">All Leaves </h3>
          <div className="box-container">
            <Card className="box" style={{ width: "18rem" }} color="dark">
              <Card.Title variant="top">Employee name</Card.Title>
              <Card.Body>
                <Card.Text>Paid leave 2-days</Card.Text>
                <Card.Text>10 Feb Session 1</Card.Text>
                <Card.Text>to</Card.Text>
                <Card.Text>12 Feb Session 2</Card.Text>
                <Card.Text>Reason: Health issue</Card.Text>
                {isApproved?<Button  variant="success" className="btnApp px-5">Approved</Button>:null}
                {isDenied?<Button variant="danger" className="btnDny px-5">Denied</Button>:null}
                {!isApproved && !isDenied ? <div>
                  <Button variant="success" className="btnApp" onClick={()=>setIsApproved(true)}>Approve</Button>
                <Button variant="danger" className="btnDny" onClick={()=>setIsDenied(true)}>Deny</Button>
                </div>:null}
              </Card.Body>
            </Card>
            <Card className="box" style={{ width: "18rem" }} color="dark">
              <Card.Title variant="top">Employee name</Card.Title>
              <Card.Body>
                <Card.Text>Paid leave 2-days</Card.Text>
                <Card.Text>10 Feb Session 1</Card.Text>
                <Card.Text>to</Card.Text>
                <Card.Text>12 Feb Session 2</Card.Text>
                <Card.Text>Reason: Health issue</Card.Text>
                <Button variant="success" className="btnApp">Approve</Button>
                <Button variant="danger" className="btnDny">Deny</Button>
              </Card.Body>
            </Card>
            <Card className="box" style={{ width: "18rem" }} color="dark">
              <Card.Title variant="top">Employee name</Card.Title>
              <Card.Body>
                <Card.Text>Paid leave 2-days</Card.Text>
                <Card.Text>10 Feb Session 1</Card.Text>
                <Card.Text>to</Card.Text>
                <Card.Text>12 Feb Session 2</Card.Text>
                <Card.Text>Reason: Health issue</Card.Text>
                <Button variant="success" className="btnApp">Approve</Button>
                <Button variant="danger" className="btnDny">Deny</Button>
              </Card.Body>
            </Card>
            <Card className="box" style={{ width: "18rem" }} color="dark">
              <Card.Title variant="top">Employee name</Card.Title>
              <Card.Body>
                <Card.Text>Paid leave 2-days</Card.Text>
                <Card.Text>10 Feb Session 1</Card.Text>
                <Card.Text>to</Card.Text>
                <Card.Text>12 Feb Session 2</Card.Text>
                <Card.Text>Reason: Health issue</Card.Text>
                <Button variant="success" className="btnApp">Approve</Button>
                <Button variant="danger" className="btnDny">Deny</Button>
              </Card.Body>
            </Card>
            <Card className="box" style={{ width: "18rem" }} color="dark">
              <Card.Title variant="top">Employee name</Card.Title>
              <Card.Body>
                <Card.Text>Paid leave 2-days</Card.Text>
                <Card.Text>10 Feb Session 1</Card.Text>
                <Card.Text>to</Card.Text>
                <Card.Text>12 Feb Session 2</Card.Text>
                <Card.Text>Reason: Health issue</Card.Text>
                <Button variant="success" className="btnApp">Approve</Button>
                <Button variant="danger" className="btnDny">Deny</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};
