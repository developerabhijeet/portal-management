import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../style.css";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome CSS
import "../../bootstrap.min.css";
import { logo } from "../../assets/assets";
import ChangeStatus from "../../pages/ChangeStatus/ChangeStatus";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUser, FaUserLock } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const localToken = localStorage.getItem("jwtToken");
  const [toggleNav, setToggleNav] = useState(false);

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
        <div
          className={toggleNav ? "sidebar pe-4 pb-3 open" : "sidebar pe-4 pb-3"}
        >
          <nav className="navbar bg-secondary navbar-dark">
            <div className="ms-5 mt-2">
              <img
                src={require("../../assets/logo.png")}
                alt="logo"
                height={50}
                width={140}
              />
            </div>
            <div className="d-flex align-items-center ms-4 mt-4">
              <div className="position-relative">
                <FaRegCircleUser size={40} />
                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
              </div>
              <div className="ms-3">
                <h6 className="mb-0">{`${firstName} ${lastName}`}</h6>
                <span>{`${role}`}</span>
              </div>
            </div>
            <div className="navbar-nav w-100 mt-5">
              <Link to="/">
                <div className=" nav-link active d-flex  align-items-center">
                  <div className="bg-secondary rounded-circle d-flex me-2 align-items-center justify-content-center h3 w3 m-0 p-0">
                    <AiOutlineDashboard size={20} />
                  </div>
                  <div>Dashboard</div>
                </div>
              </Link>

              <Link to="/send_daily_status">
                <div className="nav-link">
                  <i className="fa fa-laptop me-2"></i>Send Updates
                </div>
              </Link>
              <Link to="/daily_status_updates">
                <div className="nav-link">
                  <i className="fa fa-laptop me-2"></i>My Updates
                </div>
              </Link>
              <Link to="/my_leave">
                <div className="nav-link">
                  <i className="fa fa-th me-2"></i>My Leaves
                </div>
              </Link>

              <Link to="/holidays">
                <div className="nav-link">
                  <i className="fa fa-table me-2"></i>Holidays
                </div>
              </Link>
              <Link to="/edit_skills">
                <div className="nav-link">
                  <i className="fa fa-th me-2"></i>Skills
                </div>
              </Link>
            </div>
          </nav>
        </div>
        {/* Sidebar End */}
        {/* Content Start */}
        <div className={toggleNav ? "content open" : "content"}>
          {/* Navbar Start  */}
          <Navbar
            collapseOnSelect
            expand="lg"
            className=" navbar-expand bg-secondary navbar-dark sticky-top m-0 ps-3 p-0"
          >
            <span
              className="sidebar-toggler text-brand content open flex-shrink-0"
              style={{ cursor: "pointer" }}
              onClick={() => setToggleNav(!toggleNav)}
            >
              <i className="fa fa-bars"></i>
            </span>
            <Container className="pe-0 me-4">
              <div>
                <h2 className="m-0 text-brand"></h2>
              </div>
              <div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="">
                    <div className="d-flex nav-link">
                      <NavDropdown
                        className=""
                        menuVariant="dark"
                        title="Tests/calls"
                        id="collapsible-nav-dropdown"
                      >
                        <NavDropdown.Item onClick={() => navigate("/calls")}>
                          Calls
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/tests")}>
                          Tests
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    <div className="d-flex nav-link ms-0 ">
                      <NavDropdown
                        menuVariant="dark"
                        title="Support"
                        id="collapsible-nav-dropdown"
                      >
                        <NavDropdown.Item
                          onClick={() => navigate("/discussion_desk")}
                        >
                          Discussion Desk
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => navigate("/help_desk")}
                        >
                          Help Desk
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    <div className="d-flex nav-link ms-0 ">
                      <NavDropdown
                        align="end"
                        menuVariant="dark"
                        title={`${firstName} ${lastName}`}
                        id="collapsible-nav-dropdown"
                      >
                        <NavDropdown.Item
                          onClick={() => navigate("/edit_profile")}
                        >
                          Edit Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => navigate("/edit_personal_info")}
                        >
                          Edit Personal info
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => logout()}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    {role === "admin" && localToken && (
                      <div className="d-flex nav-link ms-0 ">
                        <NavDropdown
                          title="Admin Panel"
                          menuVariant="dark"
                          align="end"
                          id="collapsible-nav-dropdown"
                        >
                          <NavDropdown.Item onClick={() => navigate("/Signup")}>
                            Add User
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => navigate("/All_users")}
                          >
                            Users
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => navigate("/projectUpdate")}
                          >
                            Projects
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => navigate("/tests")}>
                            Tests
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => navigate("/calls")}>
                            Calls
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => navigate("/my_leave")}
                          >
                            Leaves
                          </NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Container>
          </Navbar>
          {/* Navbar End */}
        </div>
      </div>
      {showModal ? (
        <ChangeStatus showModal={showModal} setShowModal={setShowModal} />
      ) : null}
    </>
  );
};

export default Header;
