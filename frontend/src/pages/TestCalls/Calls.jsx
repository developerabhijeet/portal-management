import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Table } from "react-bootstrap";
import "./InterviewCalls.css";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Layout from "../../components/Layout";
import OptionsSelect from "../../components/selectOption/selectOption";
import { selectPriority, selectTech } from "../../Utils/constant";

const Calls = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    DeveloperProfile: Yup.string().required(),
    assigned: Yup.string().required(),
    round: Yup.number().positive().integer().required(),
    status: Yup.string().required(),
    technology: Yup.string().required(),
    scheduledTo: Yup.date().required(),
    scheduledFrom: Yup.date().required(),
    priority: Yup.string().required(),
  });

  const onSubmit = async (actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  return (
    <>
      <Layout>
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
          <div className="form">
            <Formik
              initialValues={{
                name: "",
                DeveloperProfile: "",
                assigned: "",
                round: "",
                status: "",
                technology: "",
                scheduledTo: "",
                scheduledFrom: "",
                priority: "",
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
                <Input
                  label="Scheduled at from"
                  style="style"
                  type="date"
                  id="scheduledFrom"
                  name="scheduledFrom"
                />
                <Input
                  label="Scheduled at to"
                  style="style"
                  type="date"
                  id="scheduledTo"
                  name="scheduledTo"
                />
                <SelectInput
                  label="Priority"
                  id="priority"
                  name="priority"
                  style="style"
                >
                  <OptionsSelect options={selectPriority} />
                </SelectInput>
                <SelectInput
                  label="Primary technology"
                  id="technology"
                  name="technology"
                  style="style"
                >
                  <OptionsSelect options={selectTech} />
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
      </Layout>
    </>
  );
};
export default Calls;
