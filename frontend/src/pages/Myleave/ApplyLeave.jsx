import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form } from "react-bootstrap";
import Select from "react-dropdown-select";
import { emails } from "../../Utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
export const ApplyLeave = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const leaveType = location.state;
  const [mailTo, setMailTo] = useState([]);
  const [data, setData] = useState({
    fromDate: "",
    fromSession: "",
    toDate: "",
    toSession: "",
    days: "",
    reason: "",
  });
  const [errors, setErrors] = useState({
    fromDate: "",
    toDate: "",
    mailTo: "",
    reason: "",
  });
  const { fromDate, toDate, fromSession, toSession, reason, days } = data;

  const validationCheck = () => {
    let isValid = true;
    const newErrors = { errors };

    if (!fromDate.trim()) {
      isValid = false;
      newErrors.fromDate = "Please select Date";
    }
    if (!toDate.trim()) {
      isValid = false;
      newErrors.toDate = "Please select Date";
    }
    if (!reason.trim()) {
      isValid = false;
      newErrors.reason = "Please write reason of leave";
    }
    if (mailTo.length < 1) {
      isValid = false;
      newErrors.mailTo = "Please select atleast one Mail id";
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationCheck()) {
      console.log("DATA APPLY LEAVE: ", data, mailTo);
    }
  };
  return (
    <Layout>
      <div className="containerOne">
        <div>
          <h3 className="headOne">Apply {leaveType}</h3>
          <Form className="m-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw">From date</Form.Label>
              <Form.Control
                type="date"
                style={{ colorScheme: "dark" }}
                name="fromDate"
                value={fromDate}
                onChange={(e) => handleChange(e)}
                className="text-light bg-dark border-secondary"
              />
              <Form.Text className="text-danger">{errors.fromDate}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw">From session</Form.Label>
              <Form.Control
                as="select"
                className="bg-dark text-white border-secondary"
                name="fromSession"
                value={fromSession}
                onChange={(e) => handleChange(e)}
              >
                <option value="session-1">Session 1</option>
                <option value="session-2">Session 2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw">To date</Form.Label>
              <Form.Control
                type="date"
                name="toDate"
                style={{ colorScheme: "dark" }}
                value={toDate}
                onChange={(e) => handleChange(e)}
                className="text-light bg-dark border-secondary"
              />
              <Form.Text className="text-danger">{errors.toDate}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw">To session</Form.Label>
              <Form.Control
                as="select"
                className="bg-dark text-white border-secondary"
                defaultValue={"session-2"}
                name="toSession"
                onChange={(e) => handleChange(e)}
              >
                <option value="session-1">Session 1</option>
                <option value="session-2">Session 2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw">Days</Form.Label>
              <Form.Control
                disabled
                name="days"
                value={days}
                className="text-light bg-dark border-secondary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw">Mail to</Form.Label>
              <Select
                multi
                searchable
                placeholder=""
                color="#717171"
                style={{ colorScheme: "dark" }}
                className="text-secondary bg-dark border-secondary"
                options={emails}
                onChange={(val) => setMailTo(val)}
              />
              <Form.Text className="text-danger">{errors.mailTo}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw">Reason</Form.Label>
              <Form.Control
                name="reason"
                value={reason}
                onChange={(e) => handleChange(e)}
                as="textarea"
                placeholder="Leave a reason here"
                className="text-light bg-dark border-secondary"
              />
              <Form.Text className="text-danger">{errors.reason}</Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                className="fw"
                variant="success"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                APPLY
              </Button>{" "}
              <Button
                className="fw"
                variant="primary"
                onClick={() => navigate("/my_leave")}
              >
                BACK
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
