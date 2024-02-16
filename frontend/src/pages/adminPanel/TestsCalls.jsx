import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BaseURL } from "../../Utils/utils";
import { Table, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Input from "../TestCalls/Input";
import SelectInput from "../TestCalls/SelectInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import OptionsSelect from "../../components/selectOption/selectOption";
import {
  selectMode,
  selectPriority,
  selectStatus,
  selectTech,
} from "../../Utils/constant";

const TestsCalls = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/auth/getUser`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [setUsers]);

  return (
    <>
      <Layout newIndex="6">
        <DropdownButton
          variant="outline-info"
          title="Tests/Calls"
          className="my-4 d-flex container justify-content-end"
          menuVariant="dark"
        >
          <Dropdown.Item>Tests</Dropdown.Item>
          <Dropdown.Item>Calls</Dropdown.Item>
        </DropdownButton>
        <div className="mt-4 container bg p-3">
          <h3 className="text-brand">Assign Tests and Calls</h3>
          <div className="my-3">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>
                        <Button
                          variant="outline-info me-2"
                          onClick={() => {
                            navigate("/testsform", {
                              state: {
                                id: item._id,
                                firstName: item.firstName,
                                lastName: item.lastName,
                                users: users,
                              },
                            });
                          }}
                        >
                          Tests
                        </Button>
                        <Button
                          variant="outline-success"
                          onClick={() => {
                            navigate("/callsform", {
                              state: {
                                id: item._id,
                                firstName: item.firstName,
                                lastName: item.lastName,
                                users: users,
                              },
                            });
                          }}
                        >
                          Calls
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TestsCalls;

export const TestForm = () => {
  const location = useLocation();
  const { users } = location.state;
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
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const handleReset = (values) => {
    values = {};
  };

  const empolyeeName = [];
  users.map((item) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    return empolyeeName.push(fullName);
  });
  return (
    <>
      <Layout newIndex="6">
        <div className="container bg my-5" style={{ width: "540px" }}>
          <div className="py-3">
            <h4 className="text-brand">Assign Test Task</h4>
          </div>
          <div className="m-1">
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
              onReset={handleReset}
            >
              <Form>
                <Input
                  label="By Client name"
                  type="text"
                  id="name"
                  name="name"
                />
                <SelectInput
                  label="By developer profile"
                  type="text"
                  name="DeveloperProfile"
                  id="DeveloperProfile"
                >
                  <OptionsSelect
                    options={empolyeeName}
                    defaultOption={"Select developer profile"}
                  />
                </SelectInput>
                <SelectInput
                  label="Assigned to"
                  type="text"
                  name="assigned"
                  id="assigned"
                >
                  <OptionsSelect
                    options={empolyeeName}
                    defaultOption={"Select assigned to"}
                  />
                </SelectInput>
                <Input
                  label="Round Contains"
                  min={1}
                  max={10}
                  type="number"
                  id="round"
                  name="round"
                />
                <SelectInput
                  label="Status"
                  type="text"
                  name="status"
                  id="status"
                >
                  <OptionsSelect
                    options={selectStatus}
                    defaultOption={"Select Status"}
                  />
                </SelectInput>
                <SelectInput label="Mode" id="mode" name="mode">
                  <OptionsSelect
                    options={selectMode}
                    defaultOption={"Select Mode"}
                  />
                </SelectInput>
                <Input
                  label="Deadline from"
                  type="date"
                  id="timeFrom"
                  name="DeadlineFrom"
                />
                <Input
                  label="Deadline to"
                  type="date"
                  id="timeTo"
                  name="DeadlineTo"
                />
                <SelectInput label="Priority" id="priority" name="priority">
                  <OptionsSelect
                    options={selectPriority}
                    defaultOption={"Select Priority"}
                  />
                </SelectInput>
                <SelectInput
                  label="Primary technology"
                  id="technology"
                  name="technology"
                >
                  <OptionsSelect
                    options={selectTech}
                    defaultOption={"Select Technology"}
                  />
                </SelectInput>
                <Button
                  type="submit"
                  className="me-3 mb-3"
                  variant="outline-success"
                >
                  Submit
                </Button>

                <Button type="reset" className="mb-3" variant="outline-danger">
                  Clear Search
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const CallsForm = () => {
  const location = useLocation();
  const { users } = location.state;
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

  const onSubmit = async (values, actions) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const handleReset = (values) => {
    values = {};
  };

  const empolyeeName = [];
  users.map((item) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    return empolyeeName.push(fullName);
  });

  return (
    <>
      <Layout newIndex="6">
        <div className="container bg my-5" style={{ width: "540px" }}>
          <div className="py-3">
            <h4 className="text-brand">Assign Call</h4>
          </div>
          <div className="m-1">
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
              onReset={handleReset}
            >
              <Form>
                <Input
                  label="By Client name"
                  type="text"
                  id="name"
                  name="name"
                />
                <SelectInput
                  label="By developer profile"
                  type="text"
                  name="DeveloperProfile"
                  id="DeveloperProfile"
                >
                  <OptionsSelect
                    options={empolyeeName}
                    defaultOption={"Select developer profile"}
                  />
                </SelectInput>
                <SelectInput
                  label="Assigned to"
                  type="text"
                  name="assigned"
                  id="assigned"
                >
                  <OptionsSelect
                    options={empolyeeName}
                    defaultOption={"Select assigned to"}
                  />
                </SelectInput>
                <Input
                  label="Round Contains"
                  min={1}
                  max={10}
                  type="number"
                  id="round"
                  name="round"
                />
                <SelectInput
                  label="Status"
                  type="text"
                  name="status"
                  id="status"
                >
                  <OptionsSelect
                    options={selectStatus}
                    defaultOption={"Select Status"}
                  />
                </SelectInput>
                <Input
                  label="Scheduled at from"
                  type="date"
                  id="scheduledFrom"
                  name="scheduledFrom"
                />
                <Input
                  label="Scheduled at to"
                  type="date"
                  id="scheduledTo"
                  name="scheduledTo"
                />
                <SelectInput label="Priority" id="priority" name="priority">
                  <OptionsSelect
                    options={selectPriority}
                    defaultOption={"Select Priority"}
                  />
                </SelectInput>
                <SelectInput
                  label="Primary technology"
                  id="technology"
                  name="technology"
                >
                  <OptionsSelect
                    options={selectTech}
                    defaultOption={"Select Technology"}
                  />
                </SelectInput>
                <Button
                  type="submit"
                  className="me-3 mb-3"
                  variant="outline-success"
                >
                  Submit
                </Button>

                <Button type="reset" className="mb-3" variant="outline-danger">
                  Clear Search
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </Layout>
    </>
  );
};
