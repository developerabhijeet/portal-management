import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../style.css";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome CSS
import "../../bootstrap.min.css";
import { logo } from "../../assets/assets";
import ChangeStatus from "../../pages/ChangeStatus/ChangeStatus";
import { FaUserEdit } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const localToken = localStorage.getItem("jwtToken");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

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
  const handleChangeStatus = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="">
        {/* sidebar start */}
        <div className="sidebar pe-4 pb-3">
          <nav className="navbar bg-secondary navbar-dark">
            <a className="navbar-brand mx-4 mb-3">
              <h3 className="text-primary">
                <FaUserEdit className="me-3" />
                Bestpeers
              </h3>
            </a>
            <div className="d-flex align-items-center ms-4 mb-4">
              <div className="position-relative">
                <FaRegCircleUser size={40} />
                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
              </div>
              <div className="ms-3">
                <h6 className="mb-0">Jay prakash Gupta</h6>
                <span>Admin</span>
              </div>
            </div>
            <div className="navbar-nav w-100">
              <div
                className="nav-item nav-link active d-flex"
                style={{ alignItems: "center" }}
              >
                <div
                  className="bg-secondary rounded-circle d-flex me-3"
                  style={{
                    height: "40px",
                    width: "40px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AiOutlineDashboard size={20} />
                </div>
                <div>Dashboard</div>
              </div>

              <div className="nav-item dropdown">
                <a href="/Calls" className="nav-link dropdown-toggle">
                  <i className="fa fa-laptop me-2"></i>Calls
                </a>
                <div className="dropdown-menu bg-transparent border-0">
                  <a className="dropdown-item">Buttons</a>
                  <a className="dropdown-item">Typography</a>
                  <a className="dropdown-item">Other Elements</a>
                </div>
              </div>
              <a href="/edit_profile" className="nav-item nav-link">
                <i className="fa fa-th me-2"></i> Update profile
              </a>
              <a href="/edit_personal_info" className="nav-item nav-link">
                <i className="fa fa-laptop me-2"></i>Tests
              </a>
              <a href="/send_daily_status" className="nav-item nav-link">
                <i className="fa fa-table me-2"></i>Daily status
              </a>
              <a href="/discussion_desk" className="nav-item nav-link">
                <i className="fa fa-th me-2"></i>Charts
              </a>
              <a href="/Calls" className="nav-link dropdown-toggle">
                <i className="fa fa-laptop me-2"></i>Calls
              </a>
              <div className="nav-item dropdown">
                <div className="dropdown-menu bg-transparent border-0">
                  <a className="dropdown-item">Sign In</a>
                  <a className="dropdown-item">Sign Up</a>
                  <a className="dropdown-item">404 Error</a>
                  <a className="dropdown-item">Blank Page</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* Sidebar End */}
        {/* Content Start */}
        <div className="content">
          <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
            <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#features">Features</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link>
                  <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link href="#deets">More deets</Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
      {showModal ? (
        <ChangeStatus showModal={showModal} setShowModal={setShowModal} />
      ) : null}
    </>
  );
};

export default Header;
