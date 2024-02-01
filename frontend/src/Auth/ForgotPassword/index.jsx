import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <div className="containerOne bg-dark">
      <h3 className="headOne">FORGOT PASSWORD</h3>
      <Form className="m-4">
        <Form.Group className="mb-4" controlId="formGroupEmail">
          <Form.Label className="fw">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value=""
            onChange={() => {}}
            className="bg-dark text-white"
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button
            className="fw"
            variant="success"
            type="submit"
            onClick={() => {}}
          >
            SEND
          </Button>

          <Button
            className="fw"
            variant="secondary"
            type="submit"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </Button>
        </div>{" "}
      </Form>
    </div>
  );
};

export default ForgotPassword;
