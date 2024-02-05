import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import "./InterviewCalls.css";
import { Table, Form } from "react-bootstrap";
import Header from "../../Header/Header";

const InterviewCalls = () => {
  const countryValidationSchema = Yup.object({
    country: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    }),
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    round: Yup.number().required(),
    DeveloperProfile: Yup.string().required(),
    email: Yup.string().email().required(),
    country: countryValidationSchema,
    technology: Yup.string().required(),
    time: Yup.date().required(),
    CV: Yup.mixed().required(),
    salary: Yup.string().required(),
    salary: Yup.string()
      .required("Expected Salary is a required field")
      .matches(
        /^\$\d+\sUSD\/Month$/,
        "Invalid salary format. Use $X USD/Month"
      ),
    details: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      round: null,
      DeveloperProfile: "",
      email: "",
      country: null,
      technology: "",
      time: "",
      CV: null,
      salary: "",
      details: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("formValues", values);
    },
  });

  return (
    <>
        <CssBaseline />
        <Header />
        <div className="main-container">
          <div className="container" style={{ flex: 2 }}>
            <h5 className="create-heading">Create</h5>
            <Table striped hover variant="dark">
              <thead>
                <tr>
                  <th>Client's Details</th>
                  <th>Profile</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>one</td>
                  <td>python</td>
                  <td>online</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="form">
            <h5 className="interview-heading">Interviews</h5>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3 ">
                <Form.Label>Assigned to:</Form.Label>
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
              <Form.Group className="mb-3 ">
                <Form.Label>Round:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  min={1}
                  max={10}
                  type="number"
                  id="round"
                  name="round"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                />
                {formik.touched.round && formik.errors.round ? (
                  <p className="error">{formik.errors.round}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Developers Profile:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  type="text"
                  name="DeveloperProfile"
                  id="profile"
                  value={formik.values.DeveloperProfile}
                  onChange={formik.handleChange}
                />
                {formik.touched.DeveloperProfile &&
                formik.errors.DeveloperProfile ? (
                  <p className="error">{formik.errors.DeveloperProfile}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Profile Email:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  type="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error">{formik.errors.email}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Technology:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  type="text"
                  id="tech"
                  name="technology"
                  value={formik.values.technology}
                  onChange={formik.handleChange}
                />
                {formik.touched.technology && formik.errors.technology ? (
                  <p className="error">{formik.errors.technology}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Scheduled At:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  type="datetime-local"
                  id="time"
                  name="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                />
                {formik.touched.time && formik.errors.time ? (
                  <p className="error">{formik.errors.time}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>CV:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  id="cv"
                  type="file"
                  onChange={(e) => {
                    formik.setFieldValue("CV", e.currentTarget.files[0]);
                  }}
                />
                {formik.touched.CV && formik.errors.CV ? (
                  <p className="error">{formik.errors.CV}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Expected Salary:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  id="salary"
                  type="text"
                  onChange={formik.handleChange}
                />
                {formik.touched.salary && formik.errors.salary ? (
                  <p className="error">{formik.errors.salary}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Details:</Form.Label>
                <Form.Control
                  as="textarea"
                  id="details"
                  name="details"
                  style={{
                    backgroundColor: "black",
                    color: "#fff",
                    height: "100px",
                  }}
                  value={formik.values.details}
                  onChange={formik.handleChange}
                />
                {formik.touched.details && formik.errors.details ? (
                  <p className="error">{formik.errors.details}</p>
                ) : null}
              </Form.Group>
              <button type="submit" className="submitbtn">
                Submit
              </button>
            </Form>
          </div>
        </div>
    </>
  );
};
export default InterviewCalls;
