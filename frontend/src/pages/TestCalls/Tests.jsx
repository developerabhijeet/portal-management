import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Formik, Form } from "formik";
import moment from "moment";
import * as Yup from "yup";
import Header from "../../components/Header/index";
import { Table } from "react-bootstrap";
import "./InterviewCalls.css";
import Input from "./Input";
import SelectInput from "./SelectInput";

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
    mode: Yup.string().required(),
    DeadlineTo: Yup.date().required(),
    DeadlineFrom: Yup.date().required(),
    priority: Yup.string().oneOf(["High", "Medium", "Low"]).required(),
    technology: Yup.string().required(),
  });

  const onSubmit = async (values, actions) => {
    const formattedTime = moment(values.time).format("DD-MMM-YYYY hh:mm A");
    values.time = formattedTime;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    console.log("testValues", values);
  };

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
          <div className="form">
            <Formik
              initialValues={{
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
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <Input
                  label="By Client name"
                  style="style"
                  type="text"
                  id="name"
                  name="name"
                />
                <Input
                  label="By developer profile"
                  style="style"
                  type="text"
                  name="DeveloperProfile"
                  id="DeveloperProfile"
                />
                <Input
                  label="Assigned to"
                  style="style"
                  type="text"
                  name="assigned"
                  id="assigned"
                />
                <Input
                  label="Round Contains"
                  style="style"
                  min={1}
                  max={10}
                  type="number"
                  id="round"
                  name="round"
                />
                <Input
                  label="Status"
                  style="style"
                  type="text"
                  name="status"
                  id="status"
                />
                <SelectInput label="Mode" id="mode" name="mode" style="style">
                  <option>Select Mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </SelectInput>
                <Input
                  label="Deadline from"
                  style="style"
                  type="datetime-local"
                  id="timeFrom"
                  name="DeadlineFrom"
                />
                <Input
                  label="Deadline to"
                  style="style"
                  type="datetime-local"
                  id="timeTo"
                  name="DeadlineTo"
                />
                <SelectInput
                  label="Priority"
                  id="priority"
                  name="priority"
                  style="style"
                >
                  <option>Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </SelectInput>
                <SelectInput
                  label="Primary technology"
                  id="technology"
                  name="technology"
                  style="style"
                >
                  <option>Select technology</option>
                  <option value="Django">Django</option>
                  <option value="React">React</option>
                  <option value="Angular">Angular</option>
                </SelectInput>
                <button type="submit" className="submitbtn">
                  Search
                </button>
                <button type="button" className="searchbtn">
                  Clear Search
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Tests;
