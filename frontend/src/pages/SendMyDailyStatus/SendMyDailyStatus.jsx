import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { BaseURL } from "../../Utils/utils";
import Layout from "../../components/Layout";
import "../index.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button, Col, Form, Row } from "react-bootstrap";
import { statusOption } from "../../Utils/constant";
import { useLocation } from "react-router-dom";
import OptionsSelect from "../../components/selectOption/selectOption";
import ChangeStatus from "../ChangeStatus/ChangeStatus";

const SendMyDailyStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState([]);
  const [projectUpdate, setProjectUpdate] = useState([]);
  const [editData, setEditData] = useState(false);
  const [editId, setEditId] = useState(null);
  const [tasks, setTasks] = useState([
    {
      projectStatus: "none",
      workingHour: "09:00",
      status: "",
      task: "",
    },
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmail = (selectedOptions) => {
    const usersEmail = selectedOptions.map((e) => e.value);
    setEmail(usersEmail);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/auth/getEmail`);
        setEmail(response.data.emails);
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };

    getData();
  }, [navigate, handleEmail]);

  useEffect(() => {
    if (location.state !== null) {
      setEditData(true);
      setEditId(location.state.item._id);
      updateStatus();
    }
  }, [location.state]);

  const updateStatus = () => {
    const { dueDate, tasks, email } = location.state.item;
    let d = new Date(dueDate);
    d = d.toLocaleDateString();
    setStartDate(new Date(d));
    setTasks([...tasks]);
    setEmail([...email]);
  };

  const handleUpdate = async (e, completed) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    try {
      await axios.put(
        `${BaseURL}/tasks/${editId}`,
        {
          email: email,
          dueDate: startDate,
          tasks: tasks,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        },
      );
      setEditData(false);
      navigate("/daily_status_updates");
    } catch (error) {
      alert(error);
    }
  };

  const createEmailObjects = (emailArray) =>
    emailArray.map((email) => ({ value: email, label: email }));

  const addMoreTask = () => {
    setTasks([
      ...tasks,
      { projectStatus: "", workingHour: "09:00", status: "", task: "" },
    ]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const projectUpdate = async () => {
      const getUserID = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${BaseURL}/project/${getUserID}`);
        const projects = response.data.projects;
        const projectSelect = [
          "None",
          ...projects.map((option) => option.projectName),
        ];
        setProjectUpdate(projectSelect);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    projectUpdate();
  }, []);

  const handleStatusSubmit = async (e, completed) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    try {
      await axios.post(
        `${BaseURL}/tasks`,
        {
          email: email,
          dueDate: startDate,
          tasks: tasks,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        },
      );
      navigate("/daily_status_updates");
    } catch (error) {
      console.error("Error submitting status:", error);
    }
  };

  const handleModalShow = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Layout>
        <div
          className="my-4 mx-auto border border-secondary"
          style={{ maxWidth: 800 }}
        >
          <div className="px-3 py-2 m-0" style={{ backgroundColor: "#515151" }}>
            <h2 className="m-0 p-0">Send Daily Status Update</h2>
          </div>

          <div className="">
            <div className="d-flex justify-content-between border-bottom border-secondary p-3 text-info">
              <div role="button" onClick={() => handleModalShow()}>
                Do you want to change your availability?
              </div>
              <div>Available</div>
            </div>
            <Form className="p-4">
              <Row className="mb-5 pb-5">
                <Form.Group as={Col}>
                  <Form.Label className="fw">To</Form.Label>
                  <Select
                    label="select"
                    isMulti
                    options={createEmailObjects(email)}
                    isSearchable
                    noOptionsMessage={() => "email not found"}
                    onChange={handleEmail}
                    styles={{
                      control: (prevStyle) => ({
                        ...prevStyle,
                        backgroundColor: "#212529",
                        borderColor: "#313131",
                      }),
                      menu: (prevStyle) => ({
                        ...prevStyle,
                        backgroundColor: "#212529",
                      }),
                      option: (prevStyle) => ({
                        ...prevStyle,
                        backgroundColor: "#212529",
                        color: "#ccc",
                      }),
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className="fw">CC</Form.Label>
                  <Form.Control
                    value="status@bestpeers.com"
                    disabled
                    className="bg-dark text-white border-dark"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className="fw">Status Date</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                    dateFormat="dd/MM/yyyy"
                    className="bg-dark text-white p-1 px-2 border-secondary "
                  />
                </Form.Group>
              </Row>

              <div>
                <div className="">
                  <h6>+ ADD YOUR TASK DETAILS</h6>
                </div>
                <div className="taskContainer">
                  {tasks.map((task, index) => (
                    <div key={index}>
                      <div className="task_status_box">
                        <div className="project_task">
                          <div>
                            <Form.Label>Project</Form.Label>
                          </div>

                          <Form.Select
                            id="select_option"
                            value={task.projectStatus}
                            onChange={(e) =>
                              setTasks((prevTasks) =>
                                prevTasks.map((prevTask, i) =>
                                  i === index
                                    ? {
                                        ...prevTask,
                                        projectStatus: e.target.value,
                                      }
                                    : prevTask,
                                ),
                              )
                            }
                          >
                            <OptionsSelect
                              options={projectUpdate}
                              defaultOption="Select Status"
                            />
                          </Form.Select>
                        </div>
                        <div className="working_hours">
                          <div>
                            <Form.Label>Working Hours</Form.Label>
                          </div>
                          <Form.Control
                            className="project_select working-field"
                            style={{
                              borderRadius: 5,
                              padding: 7,
                              borderBlockColor: "rgb(203, 204, 204)",
                            }}
                            type="time"
                            placeholder="hh:mm"
                            value={task.workingHour}
                            onChange={(e) =>
                              setTasks((prevTasks) =>
                                prevTasks.map((prevTask, i) =>
                                  i === index
                                    ? {
                                        ...prevTask,
                                        workingHour: e.target.value,
                                      }
                                    : prevTask,
                                ),
                              )
                            }
                          />
                        </div>
                        <div style={{ marginLeft: 10 }}>
                          <div>
                            <Form.Label>Status</Form.Label>
                          </div>
                          <Form.Select
                            id="select_option"
                            name="task"
                            value={task.status}
                            onChange={(e) =>
                              setTasks((prevTasks) =>
                                prevTasks.map((prevTask, i) =>
                                  i === index
                                    ? { ...prevTask, status: e.target.value }
                                    : prevTask,
                                ),
                              )
                            }
                          >
                            <OptionsSelect
                              options={statusOption}
                              defaultOption="Select Status"
                            />
                          </Form.Select>
                        </div>
                      </div>

                      <div className="task">
                        <label>Task</label>
                        <div className="task-box">
                          <textarea
                            className="task-input"
                            value={task.task}
                            onChange={(e) =>
                              setTasks((prevTasks) =>
                                prevTasks.map((prevTask, i) =>
                                  i === index
                                    ? { ...prevTask, task: e.target.value }
                                    : prevTask,
                                ),
                              )
                            }
                          />
                          <div className="delete_btn">
                            <RiDeleteBin6Line
                              color="red"
                              onClick={deleteTask}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline-primary" onClick={addMoreTask}>
                  + ADD MORE TASK
                </Button>
                {!editData ? (
                  <div className="save_send_btn_container">
                    <div className="daily-statusSave">
                      <Button
                        variant="outline-warning"
                        onClick={(e) => handleStatusSubmit(e, false)}
                      >
                        SAVE TO DRAFT
                      </Button>
                    </div>
                    <div className="daily-status-sendbtn">
                      <Button
                        variant="outline-success"
                        className="px-5"
                        onClick={(e) => handleStatusSubmit(e, true)}
                      >
                        SEND
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="save_send_btn_container">
                    <Button
                      className="px-5"
                      variant="outline-primary"
                      onClick={(e) => handleUpdate(e, true)}
                    >
                      Update
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </div>
        </div>
        {showModal ? (
          <ChangeStatus showModal={showModal} setShowModal={setShowModal} />
        ) : null}
      </Layout>
    </>
  );
};

export default SendMyDailyStatus;
