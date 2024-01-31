import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Header from "../../Header/Header";
import Button from "react-bootstrap/Button";
import "./EditEmployeesDetails.css";

export const EditEmployeesDetails = () => {
  const userName = localStorage.getItem("username")
  const userEmail = localStorage.getItem("email")
  const userPassword = localStorage.getItem("password")
  const [email, setEmail] = useState(userEmail);
  const [firstName, setFirstName] = useState(userName);
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState(userPassword);
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });

  const validationCheck = () => {
    let isValid = true;
    const newErrors = { errors };

    const emailPattern = /^[^\s@]+@(bestpeers)+.(in|com)$/;
    if (!email || !email.trim() || !emailPattern.test(email)) {
      isValid = false;
      newErrors.email = "Please enter a valid bestpeers email address";
    }
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+){0,3}$/;
    if (!firstName.trim() || !namePattern.test(firstName)) {
      isValid = false;
      newErrors.firstName = "Valid First name is required";
    }

    if (!lastName.trim() || !namePattern.test(lastName)) {
      isValid = false;
      newErrors.lastName = "Valid Last name is required";
    }

    if (password && password.length < 6) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      isValid = false;
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!currentPassword || !currentPassword.trim()) {
      isValid = false;
      newErrors.currentPassword = "Current password is required";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationCheck()) {
      const data = {
        email,
        firstName,
        lastName,
        password,
        currentPassword,
      };
      console.log("DATA:", data);
    }
  };

  return (
    <>
      <Header />
      <div className="containerOne">
        <div>
          <h3 className="headOne">Edit Employee</h3>
          <Form style={{ margin: 20 }}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="fw">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: "#313131", color: "#fff" }}
              />
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw">First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ backgroundColor: "#313131", color: "#fff" }}
              />
              <Form.Text className="text-danger">{errors.firstName}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw">Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ backgroundColor: "#313131", color: "#fff" }}
              />
              <Form.Text className="text-danger">{errors.lastName}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label
                className="fw"
                style={{ float: "left", marginRight: 5 }}
              >
                Password
              </Form.Label>
              <p style={{ color: "rgba(255,255,255, 0.8)", margin: 0 }}>
                (leave blank if you dont't want to change it)
              </p>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: "#313131", color: "#fff" }}
              />
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw">Password confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ backgroundColor: "#313131", color: "#fff" }}
              />
              <Form.Text className="text-danger">
                {errors.confirmPassword}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label
                className="fw"
                style={{ float: "left", marginRight: 5 }}
              >
                Current password
              </Form.Label>
              <p style={{ color: "rgba(255,255,255, 0.8)", margin: 0}}>(required)</p>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ backgroundColor: "#313131", color: "#fff" }}
              />
              <Form.Text className="text-danger">
                {errors.currentPassword}
              </Form.Text>
            </Form.Group>
            <Button
              className="fw"
              variant="success"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              UPDATE
            </Button>{" "}
            <Button className="fw" variant="primary">
              BACK
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
