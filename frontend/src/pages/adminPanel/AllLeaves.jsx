import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./allleaves.css";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";

export const AllLeaves = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [cancelledLeaves, setCancelledLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${BaseURL}/leaveSection`);
      const { leaveRequests } = res.data;
      const pending = leaveRequests.filter((item) => item.status === "Pending");
      const approved = leaveRequests.filter(
        (item) => item.status === "Approved",
      );
      const cancelled = leaveRequests.filter(
        (item) => item.status === "Cancelled",
      );

      setPendingLeaves(pending);
      setApprovedLeaves(approved);
      setCancelledLeaves(cancelled);
    } catch (error) {
      toast.error("Something went wrong! Please login again", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${BaseURL}/leaveSection/approve/${id}`, {
        status: "Approved",
      });
      fetchLeaves();
      toast.success("Leave approved successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`${BaseURL}/leaveSection/cancel/${id}`, {
        status: "Cancelled",
      });
      fetchLeaves();
      toast.success("Leave cancelled successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Layout newIndex="6">
        <div className="container">
          <h3 className="my-4 bg p-2 text-brand">Pending Leaves</h3>
          <div className="box-container">
            {pendingLeaves.map((item, index) => {
              const newFromDate = new Date(item.fromDate);
              const fromDate = newFromDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const newToDate = new Date(item.ToDate);
              const toDate = newToDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <Card
                  className={pendingLeaves.length > 3 ? "box mx-auto" : "box"}
                  style={{ width: "18rem" }}
                  key={index}
                >
                  <Card.Title variant="top">
                    {item.firstName} {item.lastName}
                  </Card.Title>
                  <Card.Body>
                    <Card.Text>
                      {item.leaveType}: {item.days} Days
                    </Card.Text>
                    <Card.Text>
                      {fromDate} ({item.fromSession})
                    </Card.Text>
                    <Card.Text>to</Card.Text>
                    <Card.Text>
                      {toDate} ({item.toSession})
                    </Card.Text>
                    <Card.Text>Reason: {item.reason}</Card.Text>
                    <Button
                      variant="success"
                      className="btnApp"
                      onClick={() => handleApprove(item._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      className="btnDny"
                      onClick={() => handleCancel(item._id)}
                    >
                      Cancel
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>

          <h3 className="my-4 bg p-2 text-success">Approved Leaves</h3>
          <div className="box-container">
            {approvedLeaves.map((item, index) => {
              const newFromDate = new Date(item.fromDate);
              const fromDate = newFromDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const newToDate = new Date(item.ToDate);
              const toDate = newToDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <Card
                  className="box"
                  style={{ width: "18rem" }}
                  key={index}
                >
                  <Card.Title variant="top">
                    {item.firstName} {item.lastName}
                  </Card.Title>
                  <Card.Body>
                    <Card.Text>
                      {item.leaveType}: {item.days} Days
                    </Card.Text>
                    <Card.Text>
                      {fromDate} ({item.fromSession})
                    </Card.Text>
                    <Card.Text>to</Card.Text>
                    <Card.Text>
                      {toDate} ({item.toSession})
                    </Card.Text>
                    <Card.Text>Reason: {item.reason}</Card.Text>
                    <Button className="btnApp px-5" variant="success">
                      Approved
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>

          <h3 className="my-4 bg p-2 text-danger">Cancelled Leaves</h3>
          <div className="box-container">
            {cancelledLeaves.map((item, index) => {
              const newFromDate = new Date(item.fromDate);
              const fromDate = newFromDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const newToDate = new Date(item.ToDate);
              const toDate = newToDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <Card
                  className="box"
                  style={{ width: "18rem" }}
                  key={index}
                >
                  <Card.Title variant="top">
                    {item.firstName} {item.lastName}
                  </Card.Title>
                  <Card.Body>
                    <Card.Text>
                      {item.leaveType}: {item.days} Days
                    </Card.Text>
                    <Card.Text>
                      {fromDate} ({item.fromSession})
                    </Card.Text>
                    <Card.Text>to</Card.Text>
                    <Card.Text>
                      {toDate} ({item.toSession})
                    </Card.Text>
                    <Card.Text>Reason: {item.reason}</Card.Text>
                    <Button className="btnDny px-5" variant="danger">
                      Cancelled
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </Layout>
      <ToastContainer />
    </>
  );
};
