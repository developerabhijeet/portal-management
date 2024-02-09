import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BaseURL } from "../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/forgotPass/reset-password/${id}/${token}`,
        );
        setMessage(response.data.status);
        if (response.status === 200) {
          console.log("valid user");
          setData(true);
        } else if (response.status === 401) {
          navigate("*"); // Navigate to not-found page if token is expired
        }
      } catch (error) {
        console.error("Error verifying reset token:", error);
        setMessage("Error verifying reset token");
      }
    };
    verifyResetToken();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BaseURL}/forgotPass/reset-password/${id}/${token}`,
        { password },
      );
      setMessage(response.data.status);
      if (response.status === 200) {
        setPassword("");
        toast.success("Password reset successful!", {
          onClose: () => navigate("/login"),
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error resetting password", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {data ? (
        <div className="containerOne bg-dark" style={{ margin: "9% auto" }}>
          <h3 className="headOne">Reset Password</h3>
          <Form className="m-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formGroupPassword">
              <Form.Label className="fw">Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-dark text-white"
              />
              <span
                className="position-relative"
                style={{ top: "-32px", right: "-485px", cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoIosEyeOff size={20} />
                ) : (
                  <IoIosEye size={20} />
                )}
              </span>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button className="fw" variant="success" type="submit">
                RESET PASSWORD
              </Button>
              <Button
                className="fw"
                variant="secondary"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </Button>
            </div>
          </Form>
          <ToastContainer />
        </div>
      ) : (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <strong>Loading...</strong>
          <div
            className="spinner-border text-primary"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
