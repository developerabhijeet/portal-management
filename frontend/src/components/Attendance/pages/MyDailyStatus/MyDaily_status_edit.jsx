import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { BaseURL } from "../../../../Utils/utils";
import Layout from "../../../Layout/Layout";
import "../../dashboard.css";
import StatusDropdown from "../SendMyDailyStatus/StatusDropdown";

const MyDaily_status_edit = () => {
  const { state } = useLocation();
  const data = state.item;
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState([]);
  const [tasks, setTasks] = useState(data.tasks);

  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("jwtToken");
    if (!localToken) {
      navigate("/login");
      return;
    }

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
    const lastTask = tasks[tasks.length - 1];
    setTasks([...tasks, { ...lastTask }]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleStatusSubmit = async (e, completed) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    try {
      await axios.put(
        `${BaseURL}/tasks/${data._id}`,
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

  return (
    <>
      <Layout>
        <div className="status-update-form panel panel-info">
          <div className="panel-heading">
            <h2 className="panel-title">Send Daily Status Update</h2>
          </div>
          <div className="available">
            <p>
              <a href="employee_availabilities">
                Do you want to change your availability?
              </a>
            </p>
            <p>Available</p>
          </div>
          <div>
            <form onSubmit={(e) => handleStatusSubmit(e, true)}>
              <div>
                <div>
                  <p>To</p>
                  <Select
                    className="select_mail"
                    isMulti
                    options={createEmailObjects(email)}
                    isClearable
                    isSearchable
                    noOptionsMessage={() => "email not found"}
                    onChange={handleEmail}
                  />
                </div>
                <div>
                  <p>CC</p>
                  <p>status@bestpeers.com</p>
                  <div>
                    <label>Status Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      required
                      dateFormat="dd/MM/yy"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <h6>+ ADD YOUR TASK DETAILS</h6>
                    </div>
                    {tasks.map((task, index) => (
                      <div key={index}>
                        <div>
                          <label>Project</label>
                          <select
                            className="form-select"
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
                          >
                            <option value="">Select Project</option>
                            <option value="None">None</option>
                          </select>
                        </div>
                        <div>
                          <label>Working Hours</label>
                          <input
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
                        <div>
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
                        <button
                          type="button"
                          className="daily-status-btn"
                          onClick={() => deleteTask(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <div className="daily-status">
                      <button
                        type="button"
                        className="daily-status-btn"
                        onClick={addMoreTask}
                      >
                        + ADD MORE TASK
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="daily-status-sendbtn">
                    <button type="submit" className="daily-status-btnsend">
                      Update Daily Status
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MyDaily_status_edit;