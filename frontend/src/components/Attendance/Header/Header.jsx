// DashboardNavbar.js
import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseURL } from "../../../Utils/utils";

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
  }, []);
  const logout = async () => {
    try {
      // await axios.post(`${BaseURL}/tasks/logout`);
      const token = localStorage.getItem("jwtToken");
      if (token) {
        localStorage.clear();
        toast.success("Logout successful");
        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  return (
    <div className="dashboardContainer">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Tests/calls" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/calls">Calls</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/tests">Tests</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/interview">Create</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Project" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/project-updates">Project Updates</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Attendance" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/daily_status_updates">My Daily Status</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/send_daily_status">Send Daily Status</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/my_leave">My Leaves</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/holidays">Holidays</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/change_status">Change Status</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/edit_profile">Edit Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/edit_personal_info">Edit Personal Info</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/edit_skills">Edit Skills</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/discussion_desk">Discussion Desk</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/help_desk">Help Desk</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <button onClick={() => logout()} to="/logout">
                    Logout
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
              {role === "admin" && localToken && (
                <NavDropdown title="Signup here" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/Signup">Signup here?</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
