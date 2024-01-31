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

const Tests = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    DeveloperProfile: Yup.string().required(),
    assigned: Yup.string().required(),
    round: Yup.number().positive().integer().required(),
    status: Yup.string().required(),
    priority: Yup.string().oneOf(["High", "Medium", "Low"]).required(),
    technology: Yup.string().required(),
    DeadlineTo: Yup.date().required(),
    DeadlineFrom: Yup.date().required(),
    mode: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      DeveloperProfile: "",
      assigned: "",
      round: "",
      status: "",
      technology: "",
      DeadlineTo: "",
      DeadlineFrom: "",
      priority: "",
      mode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values,actions) => {
      const formattedTime = moment(values.time).format("DD-MMM-YYYY hh:mm A");
      values.time = formattedTime;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <div className="main-container">
          <div className="container" style={{ flex: 2 }}>
            <h5 className="create-heading">Test Tasks</h5>
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
                <Form.Label>Mode:</Form.Label>
                <Form.Select
                  aria-label="Mode"
                  id="mode"
                  name="mode"
                  value={formik.values.mode}
                  onChange={formik.handleChange}
                  style={{ backgroundColor: "black", color: "#fff" }}
                >
                  <option>Select Mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </Form.Select>
                {formik.touched.mode && formik.errors.mode ? (
                  <span className="error">{formik.errors.mode}</span>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deadline from:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  type="datetime-local"
                  id="timeFrom"
                  name="DeadlineFrom"
                  value={formik.values.DeadlineFrom}
                  onChange={formik.handleChange}
                />
                {formik.touched.DeadlineFrom && formik.errors.DeadlineFrom ? (
                  <p className="error">{formik.errors.DeadlineFrom}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deadline to:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "black", color: "#fff" }}
                  type="datetime-local"
                  id="timeTo"
                  name="DeadlineTo"
                  value={formik.values.DeadlineTo}
                  onChange={formik.handleChange}
                />
                {formik.touched.DeadlineTo && formik.errors.DeadlineTo ? (
                  <p className="error">{formik.errors.DeadlineTo}</p>
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

export default Tests;
