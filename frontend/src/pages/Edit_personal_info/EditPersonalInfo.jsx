import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./EditPersonalInfo.css";
import { bloodGroupOptions, maritalStatusOptions } from "../../Utils/constant";
import Layout from "../../components/Layout";
import OptionsSelect from "../../components/selectOption/selectOption";
import { BaseURL } from "../../Utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPersonalInfo = () => {
  const [editProfileData, seEditProfileData] = useState("");
  const [err, setErr] = useState({});
  const [form, setForm] = useState({
    fatherName: "",
    motherName: "",
    personalEmail: "",
    bloodGroup: "",
    personalContactNum: "",
    emergencyContactNum: "",
    dateOfBirth: "",
    birthDay: "",
    presentAddress: "",
    dateOfMarriage: "",
    maritalStatus: "",
    permanentAddress: "",
  });
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const projectUpdate = async () => {
      try {
        const response = await axios.get(`${BaseURL}/editPesonalInfo`);
        const data = response.data.personalInfo;
        const projects = data.filter((val) => val.user === userId);
        seEditProfileData(projects);
      } catch (error) {
        alert(error);
      }
    };
    projectUpdate();
  }, []);

  useEffect(() => {
    if (editProfileData.length > 0) {
      setForm({
        fatherName: editProfileData[0].fatherName,
        motherName: editProfileData[0].motherName,
        personalEmail: editProfileData[0].personalEmail,
        bloodGroup: editProfileData[0].bloodGroup,
        personalContactNum: editProfileData[0].personalContactNum,
        emergencyContactNum: editProfileData[0].emergencyContactNum,
        dateOfBirth: editProfileData[0].dateOfBirth,
        birthDay: editProfileData[0].birthDay,
        presentAddress: editProfileData[0].presentAddress,
        dateOfMarriage: editProfileData[0].dateOfMarriage,
        maritalStatus: editProfileData[0].maritalStatus,
        permanentAddress: editProfileData[0].permanentAddress,
      });
    }
  }, [editProfileData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };
  const handleValid = () => {
    const error = {};
    if (motherName === "") {
      error.mNameerr = "required";
    } else {
      error.mNameerr = "";
    }
    if (fatherName === "") {
      error.fNameerr = "required";
    } else {
      error.fNameerr = "";
    }
    if (personalEmail === "") {
      error.emailErr = "required";
    } else {
      error.emailErr = "";
    }
    if (personalContactNum === "") {
      error.personalCErr = "required";
    } else {
      error.personalCErr = "";
    }
    if (emergencyContactNum === "") {
      error.emergencyContactErr = "required";
    } else {
      error.emergencyContactErr = "";
    }
    if (dateOfBirth === "") {
      error.dateOfBirthErr = "required";
    } else {
      error.dateOfBirthErr = "";
    }
    if (birthDay === "") {
      error.DOBErr = "required";
    } else {
      error.DOBErr = "";
    }
    if (presentAddress === "") {
      error.presentAddressErr = "required";
    } else {
      error.presentAddressErr = "";
    }
    if (permanentAddress === "") {
      error.permanentAddressErr = "required";
    } else {
      error.permanentAddressErrErr = "";
    }
    setErr(error);
    let valid = true;
    Object.values(error).forEach((val) => {
      val.length > 0 && (valid = false);
    });
    return valid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (handleValid()) {
      if (editProfileData.length > 0) {
        try {
          const response = await axios.put(
            `${BaseURL}/editPesonalInfo/${userId}`,
            form,
          );
          toast.success("Information updated successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          const response = await axios.post(`${BaseURL}/editPesonalInfo`, {
            user: userId,
            ...form,
          });
          toast.success("Information added successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
        } catch (error) {
          alert(error);
        }
      }
    }
  };
  const {
    fatherName,
    motherName,
    personalEmail,
    bloodGroup,
    maritalStatus,
    dateOfMarriage,
    personalContactNum,
    emergencyContactNum,
    dateOfBirth,
    birthDay,
    presentAddress,
    permanentAddress,
  } = form;
  const {
    mNameerr,
    fNameerr,
    emailErr,
    permanentAddressErr,
    presentAddressErr,
    DOBErr,
    dateOfBirthErr,
    emergencyContactErr,
    personalCErr,
  } = err;
  return (
    <Layout>
      <div>
        <div className="container-edit">
          <div className="Header">
            <h2>Personal Information</h2>
          </div>
          <div className="formBox">
            <Form>
              <Form.Group className="mb-3 inputGroup">
                <div className="inputBox">
                  <Form.Label className="label">Father Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your father name"
                    name="fatherName"
                    value={fatherName}
                    onChange={handleChange}
                  />
                  <p className="errorText">{fNameerr}</p>
                </div>
                <div className="inputBox">
                  <Form.Label className="label">Mother Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Mother name"
                    name="motherName"
                    value={motherName}
                    onChange={handleChange}
                  />
                  <p className="errorText">{mNameerr}</p>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 inputGroup">
                <div className="inputBox">
                  <Form.Label className="label">Personal Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="personalEmail"
                    value={personalEmail}
                    onChange={handleChange}
                  />
                  <p className="errorText">{emailErr}</p>
                </div>
                <div className="inputBox">
                  <Form.Label className="label">Blood Group</Form.Label>
                  <Form.Select
                    id="select"
                    name="bloodGroup"
                    value={bloodGroup}
                    onChange={handleChange}
                  >
                    <OptionsSelect
                      options={bloodGroupOptions}
                      defaultOption="Select Blood Group"
                    />
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 inputGroup">
                <div className="inputBox">
                  <Form.Label className="label">Personal Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your contact number"
                    name="personalContactNum"
                    value={personalContactNum}
                    onChange={handleChange}
                  />
                  <p className="errorText">{personalCErr}</p>
                </div>
                <div className="inputBox">
                  <Form.Label className="label">Emergency Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your contact number"
                    name="emergencyContactNum"
                    value={emergencyContactNum}
                    onChange={handleChange}
                  />
                  <p className="errorText">{emergencyContactErr}</p>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 inputGroup">
                <div className="inputBox">
                  <Form.Label className="label">Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter your date of birth"
                    id="select"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={handleChange}
                  />
                  <p className="errorText">{dateOfBirthErr}</p>
                </div>
                <div className="inputBox">
                  <Form.Label className="label">Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter your date of birth"
                    id="select"
                    name="birthDay"
                    value={birthDay}
                    onChange={handleChange}
                  />
                  <p className="errorText">{DOBErr}</p>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 inputGroup">
                <div className="inputBox">
                  <Form.Label className="label">Date of marriage</Form.Label>
                  <Form.Control
                    type="date"
                    id="select"
                    name="dateOfMarriage"
                    value={dateOfMarriage}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputBox">
                  <Form.Label className="label">Marital status</Form.Label>
                  <Form.Select
                    id="select"
                    name="maritalStatus"
                    value={maritalStatus}
                    onChange={handleChange}
                  >
                    <OptionsSelect
                      options={maritalStatusOptions}
                      defaultOption="Select Marital Status"
                    />
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 textarea">
                <Form.Label className="label">Present address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="textarea-box"
                  name="presentAddress"
                  value={presentAddress}
                  onChange={handleChange}
                />
                <p className="errorText">{presentAddressErr}</p>
              </Form.Group>
              <Form.Group className="mb-3 textarea">
                <Form.Label className="label">Permanent address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="textarea-box"
                  name="permanentAddress"
                  value={permanentAddress}
                  onChange={handleChange}
                />
                <p className="errorText">{permanentAddressErr}</p>
              </Form.Group>
              <Button
                className="update-btn"
                style={{
                  backgroundColor: "green",
                }}
                onClick={handleFormSubmit}
              >
                Update
              </Button>
              <Button className="update-btn">Back</Button>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default EditPersonalInfo;
