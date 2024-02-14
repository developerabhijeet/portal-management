import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Table } from "react-bootstrap";
import style from "./InterviewCalls.module.css";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Layout from "../../components/Layout";
import OptionsSelect from "../../components/selectOption/selectOption";
import { selectStatus, selectPriority, selectTech } from "../../Utils/constant";

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

  const handleReset = (values) => {
    values = {};
  };
  
  return (
    <>
      <Layout newIndex="6">
        <div className={style.mainContainer}>
          <div className="container" style={{ flex: 2 }}>
            <h4 className={style.createheading}>Calls</h4>
            <Table striped hover style={{backgroundColor:'#191c24'}}>
              <thead>
                <tr style={{color:'#ccc'}}>
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
          <div className={style.form}>
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
                  style={style}
                  type="text"
                  id="name"
                  name="name"
                />
                <SelectInput
                  label="By developer profile"
                  style={style}
                  type="text"
                  name="DeveloperProfile"
                  id="DeveloperProfile"
                />
                <SelectInput
                  label="Assigned to"
                  style={style}
                  type="text"
                  name="assigned"
                  id="assigned"
                />
                <Input
                  label="Round Contains"
                  style={style}
                  min={1}
                  max={10}
                  type="number"
                  id="round"
                  name="round"
                />
                <SelectInput
                  label="Status"
                  style={style}
                  type="text"
                  name="status"
                  id="status"
                >
                  <OptionsSelect options={selectStatus} defaultOption={"Select Status"}/>
                </SelectInput>
                <Input
                  label="Scheduled at from"
                  style={style}
                  type="date"
                  id="scheduledFrom"
                  name="scheduledFrom"
                />
                <Input
                  label="Scheduled at to"
                  style={style}
                  type="date"
                  id="scheduledTo"
                  name="scheduledTo"
                />
                <SelectInput
                  label="Priority"
                  id="priority"
                  name="priority"
                  style={style}
                >
                  <OptionsSelect options={selectPriority} defaultOption={"Select Priority"}/>
                </SelectInput>
                <SelectInput
                  label="Primary technology"
                  id="technology"
                  name="technology"
                  style={style}
                >
                  <OptionsSelect options={selectTech} defaultOption={"Select Technology"}/>
                </SelectInput>
                <Button type="submit" className="me-3" variant="outline-success">
                  Search
                </Button>
                <Button type="reset" variant="outline-danger">
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
export default Calls;
