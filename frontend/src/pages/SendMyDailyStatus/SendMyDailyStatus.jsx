import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BaseURL } from "../../Utils/utils";
import Layout from "../../components/Layout";
import "../index.css";
import StatusDropdown from "./StatusDropdown";
import { RiDeleteBin6Line } from "react-icons/ri";
import ChangeStatus from "../ChangeStatus/ChangeStatus";
const SendMyDailyStatus = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState([]);
  const [projectUpdate, setProjectUpdate] = useState([]);
  const [tasks, setTasks] = useState([
    {
      projectStatus: "",
      workingHour: "09:00",
      status: "",
      task: "",
    },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/auth/getEmail`);
        setEmail(response.data.emails);
      } catch (error) {
        alert(error);
      }
    };

    getData();
  }, [navigate, setEmail]);

  const createEmailObjects = (emailArray) =>
    emailArray.map((email) => ({ value: email, label: email }));

  const handleEmail = (selectedOptions) => {
    const usersEmail = selectedOptions.map((e) => e.value);
    setEmail(usersEmail);
  };

  const addMoreTask = () => {
    setTasks([
      ...tasks,
      { projectStatus: "", workingHour: "", status: "", task: "" },
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
        setProjectUpdate(response.data.projects);
      } catch (error) {
        alert(error);
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
      alert(error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => {
    setShowModal(!showModal);
  };
  
  return (
    <>
      <Layout>
        <div className="status-update-form-main">
          <div className="panel-heading">
            <h2 className="panel-title">Send Daily Status Update</h2>
          </div>
          <div className="available_container">
            <p className="available_p">
              <a className="available_p_link" onClick={() => handleModalShow()}>
                Do you want to change your availability?
              </a>
            </p>
            <p className="Available_heading">Available</p>
          </div>
          <div>
            <form onSubmit={(e) => handleStatusSubmit(e, true)}>
              <div>
                <div className="emailContrainer">
                  <div className="tomail">
                    <p>To</p>
                    <Select
                      id="myfilled-name"
                      label="select"
                      variant="filled"
                      isMulti
                      options={createEmailObjects(email)}
                      isClearable
                      isSearchable
                      noOptionsMessage={() => "email not found"}
                      onChange={handleEmail}
                      classNamePrefix="select-mail"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "#333",
                          color: "#fff",
                          width: 250,
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#333",
                          color: "#fff",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected ? "#000" : "#333",
                          color: state.isSelected ? "#fff" : "#ccc",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#fff",
                        }),
                      }}
                    />
                  </div>
                  <div className="ccstatus">
                    <p>CC</p>
                    <p>status@bestpeers.com</p>
                  </div>
                  <div className="status_date">
                    <label>Status Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      required
                      dateFormat="dd/MM/yy"
                      className="custom-datepicker"
                    />
                  </div>
                </div>

                <div className="addtask">
                  <h6>+ ADD YOUR TASK DETAILS</h6>
                </div>
                <div className="taskContainer">
                  {tasks.map((task, index) => (
                    <div key={index}>
                      <div className="project_task">
                        <label>Project</label>
                        <StatusDropdown
                          status={"project"}
                          projectUpdate={projectUpdate}
                          className="project_select"
                          aria-label="Default select example"
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
                        />
                      </div>
                      <div className="working_hour">
                        <label>Working Hours</label>
                        <input
                          className="project_select"
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
                      <div className="status_task">
                        <label>Status</label>
                        <StatusDropdown
                          status={"status"}
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
                        />
                      </div>

                      <div className="task">
                        <label>Task</label>
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
                      </div>
                    </div>
                  ))}
                  <div className="delete_btn">
                    <button
                      type="button"
                      className="delete_buttonInner"
                      onClick={deleteTask}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="daily-status-btn"
                  onClick={addMoreTask}
                >
                  + ADD MORE TASK
                </button>
                <div className="save_send_btn_container">
                  <div className="daily-statusSave">
                    <button
                      type="button"
                      className="daily-status-savebtn"
                      onClick={(e) => handleStatusSubmit(e, false)}
                    >
                      SAVE TO DRAFT
                    </button>
                  </div>
                  <div className="daily-status-sendbtn">
                    <button type="submit" className="daily-status-btnsend">
                      SEND
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {console.log(showModal, "=======>><><<")}
        {showModal ? (
          <ChangeStatus showModal={showModal} setShowModal={setShowModal} />
        ) : null}
      </Layout>
    </>
  );
};

export default SendMyDailyStatus;
