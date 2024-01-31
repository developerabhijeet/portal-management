import React from "react";
import "./InterviewCalls.css";
import Form from "react-bootstrap/Form";

const CommonForm = ({ formik }) => {
  return (
    <div className="form-fields">
      <Form.Group className="mb-3 ">
        <Form.Label>By Client name:</Form.Label>
        <Form.Control
          style={{ backgroundColor: "black", color: "#fff" }}
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="error">{formik.errors.name}</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>By developer profile:</Form.Label>
        <Form.Control
          style={{ backgroundColor: "black", color: "#fff" }}
          type="text"
          name="DeveloperProfile"
          id="DeveloperProfile"
          value={formik.values.DeveloperProfile}
          onChange={formik.handleChange}
        />
        {formik.touched.DeveloperProfile && formik.errors.DeveloperProfile ? (
          <p className="error">{formik.errors.DeveloperProfile}</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Assigned to</Form.Label>
        <Form.Control
          style={{ backgroundColor: "black", color: "#fff" }}
          type="text"
          name="assigned"
          id="assigned"
          value={formik.values.assigned}
          onChange={formik.handleChange}
        />
        {formik.touched.assigned && formik.errors.assigned ? (
          <p className="error">{formik.errors.assigned}</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Round contains:</Form.Label>
        <Form.Control
          style={{ backgroundColor: "black", color: "#fff" }}
          min={1}
          max={10}
          type="number"
          id="round"
          name="round"
          value={formik.values.round}
          onChange={formik.handleChange}
        />
        {formik.touched.round && formik.errors.round ? (
          <p className="error">{formik.errors.round}</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status:</Form.Label>
        <Form.Control
          style={{ backgroundColor: "black", color: "#fff" }}
          type="text"
          name="status"
          id="status"
          value={formik.values.status}
          onChange={formik.handleChange}
        />
        {formik.touched.status && formik.errors.status ? (
          <p className="error">{formik.errors.status}</p>
        ) : null}
      </Form.Group>
    </div>
  );
};

export default CommonForm;
