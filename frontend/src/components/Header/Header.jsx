import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
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
            <div className="navbar-nav w-100 my-5">
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
          {/* Navbar Start  */}
          <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
            <a className="navbar-brand d-flex d-lg-none me-4">
              <h2 className="text-primary mb-0">
                <i className="fa fa-user-edit"></i>
              </h2>
            </a>
            <a className="sidebar-toggler flex-shrink-0">
              <i className="fa fa-bars"></i>
            </a>
            <form className="d-none d-md-flex ms-4">
              <input
                className="form-control bg-dark border-0"
                type="search"
                placeholder="Search"
              />
            </form>
            <div className="navbar-nav align-items-center ms-auto">
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa fa-envelope me-lg-2"></i>
                  <span className="d-none d-lg-inline-flex">Message</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <a className="dropdown-item">
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle"
                        src=""
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div className="ms-2">
                        <h6 className="fw-normal mb-0">
                          Jhon send you a message
                        </h6>
                        <small>15 minutes ago</small>
                      </div>
                    </div>
                  </a>
                  <hr className="dropdown-divider" />
                  <a className="dropdown-item">
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle"
                        src=""
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div className="ms-2">
                        <h6 className="fw-normal mb-0">
                          Jhon send you a message
                        </h6>
                        <small>15 minutes ago</small>
                      </div>
                    </div>
                  </a>
                  <hr className="dropdown-divider" />
                  <a className="dropdown-item">
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle"
                        src=""
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div className="ms-2">
                        <h6 className="fw-normal mb-0">
                          Jhon send you a message
                        </h6>
                        <small>15 minutes ago</small>
                      </div>
                    </div>
                  </a>
                  <hr className="dropdown-divider" />
                  <a className="dropdown-item text-center">See all message</a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa fa-bell me-lg-2"></i>
                  <span className="d-none d-lg-inline-flex">Notificatin</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <a className="dropdown-item">
                    <h6 className="fw-normal mb-0">Profile updated</h6>
                    <small>15 minutes ago</small>
                  </a>
                  <hr className="dropdown-divider" />
                  <a className="dropdown-item">
                    <h6 className="fw-normal mb-0">New user added</h6>
                    <small>15 minutes ago</small>
                  </a>
                  <hr className="dropdown-divider" />
                  <a className="dropdown-item">
                    <h6 className="fw-normal mb-0">Password changed</h6>
                    <small>15 minutes ago</small>
                  </a>
                  <hr className="dropdown-divider" />
                  <a className="dropdown-item text-center">
                    See all notifications
                  </a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <img
                    className="rounded-circle me-lg-2"
                    src=""
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="d-none d-lg-inline-flex">John Doe</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <a href="#" className="dropdown-item">
                    My Profile
                  </a>
                  <a href="#" className="dropdown-item">
                    Settings
                  </a>
                  <a href="#" className="dropdown-item">
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </nav>
          {/* Navbar End */}
        </div>
      </div>

      {/* <Navbar
        style={{ padding: "3px 30px", backgroundColor: "#333333" }}
        variant="dark"
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} height={45} classNameName="me-3" alt="img" />
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav classNameName="ms-auto gap-3 pt-2">
            <NavDropdown title="Tests/calls" menuVariant="dark">
              <NavDropdown.Item onClick={() => navigate("/calls")}>
                Calls
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/tests")}>
                Tests
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Project" menuVariant="dark">
              <NavDropdown.Item onClick={() => navigate("/projectUpdate")}>
                Project Updates
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Attendance" menuVariant="dark">
              <NavDropdown.Item
                onClick={() => navigate("/daily_status_updates")}
              >
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
            <NavDropdown
              title={`${firstName} ${lastName}`}
              menuVariant="dark"
              classNameName="mb-2"
              align="end"
            >
              <NavDropdown.Item onClick={() => handleChangeStatus()}>
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
                classNameName="ms-3 my-2"
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
      </Navbar> */}
      {showModal ? (
        <ChangeStatus showModal={showModal} setShowModal={setShowModal} />
      ) : null}
    </>
  );
};

export default Header;
