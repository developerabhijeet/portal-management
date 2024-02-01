
import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown,  Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../dashboard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const localToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!localToken) {
      navigate("/login");
      return;
    }
  }, [localToken, navigate]);

  const logout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        localStorage.clear();
        toast.success("Logout successful");
      }
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  return (
    <Navbar
      style={{ padding: "3px 30px" }}
      variant="dark"
      collapseOnSelect
      expand="lg"
    >
      <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img
          src={require("./images/logo.png")}
          height={45}
          className="me-3"
          alt="img"
        />
        Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto gap-3 pt-2">
          <NavDropdown title="Tests/calls" menuVariant="dark">
            <NavDropdown.Item onClick={() => navigate("/calls")}>
              Calls
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/tests")}>
              Tests
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Project" menuVariant="dark">
            <NavDropdown.Item onClick={() => navigate("/project-updates")}>
              Project Updates
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Attendance" menuVariant="dark">
            <NavDropdown.Item onClick={() => navigate("/daily_status_updates")}>
              My Daily Status
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/send_daily_status")}>
              Send Daily Status
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate("/my_leave")}>
              My Leaves
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate("/holidays")}>
              Holidays
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={username} menuVariant="dark" className="mb-2" align="end">
            <NavDropdown.Item onClick={() => navigate("/change_status")}>
              Change Status
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/edit_profile")}>
              Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/edit_personal_info")}>
              Edit Personal Info
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/edit_skills")}>
              Edit Skills
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate("/discussion_desk")}>
              Discussion Desk
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/help_desk")}>
              Help Desk
            </NavDropdown.Item>

            <Button
              className="ms-3 my-2"
              variant="secondary"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </NavDropdown>
          {role === "admin" && localToken && (
            <NavDropdown title="Signup here" menuVariant="dark" align="end">
              <NavDropdown.Item onClick={() => navigate("/Signup")}>
                Signup here?
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
