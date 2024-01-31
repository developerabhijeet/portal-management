import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import "../../../../index.css";
import * as Yup from "yup";
import Header from "../../Header/Header";
import { Table, Form } from "react-bootstrap";
import CommonForm from "./CommonForm";
import "./InterviewCalls.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Calls = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    DeveloperProfile: Yup.string().required(),
    assigned: Yup.string().required(),
    round: Yup.number().required(),
    status: Yup.string().required(),
    technology: Yup.string().required(),
    ScheduledTo: Yup.date().required(),
    ScheduledFrom: Yup.date().required(),
    priority: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      DeveloperProfile: "",
      assigned: "",
      round: "",
      status: "",
      technology: "",
      ScheduledTo: "",
      ScheduledFrom: "",
      priority: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formattedTime = moment(values.time).format("DD-MMM-YYYY hh:mm A");
      values.time = formattedTime;
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <div className="main-container">
          <div className="container" style={{ flex: 2 }}>
            <h5 className="create-heading">Calls</h5>
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
                  <td>java</td>
                  <td>online</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="fieldStyle form">
            <Form onSubmit={formik.handleSubmit}>
              <CommonForm formik={formik} />
              <Form.Group className="mb-3">
                <Form.Label>Scheduled at from:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  type="datetime-local"
                  id="ScheduledFrom"
                  name="ScheduledFrom"
                  value={formik.values.ScheduledFrom}
                  onChange={formik.handleChange}
                />
                {formik.touched.ScheduledFrom && formik.errors.ScheduledFrom ? (
                  <p className="error">{formik.errors.ScheduledFrom}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Scheduled at to:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  type="datetime-local"
                  id="ScheduledTo"
                  name="ScheduledTo"
                  value={formik.values.ScheduledTo}
                  onChange={formik.handleChange}
                />
                {formik.touched.ScheduledTo && formik.errors.ScheduledTo ? (
                  <p className="error">{formik.errors.ScheduledTo}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Priority:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  style={{ backgroundColor: "black", color: "#fff" }}
                >
                  <option>Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Select>
                {formik.touched.priority && formik.errors.priority ? (
                  <p className="error">{formik.errors.priority}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Primary technology:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="technology"
                  name="technology"
                  value={formik.values.technology}
                  onChange={formik.handleChange}
                  style={{ backgroundColor: "black", color: "#fff" }}
                >
                  <option>Select technology</option>
                  <option value="Django">Django</option>
                  <option value="React">React</option>
                  <option value="Angular">Angular</option>
                </Form.Select>
                {formik.touched.technology && formik.errors.technology ? (
                  <p className="error">{formik.errors.technology}</p>
                ) : null}
              </Form.Group>
              <button type="submit" className="submitbtn">
                Search
              </button>
              <button type="button" className="searchbtn">
                Clear Search
              </button>
            </Form>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};
export default Calls;
