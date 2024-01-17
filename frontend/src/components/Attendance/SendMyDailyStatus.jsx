import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BaseURL } from "../../Utils/utils";

const SendMyDailyStatus = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [tasks, setTasks] = useState([
    {
      projectStatus: "",
      workingHour: "",
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
  }, []);

  const createEmailObjects = (emailArray) =>
    emailArray.map((email) => ({ value: email, label: email }));

  const handleEmail = (selectedOptions) => {
    const usersEmail = selectedOptions.map((e) => e.value);
    setEmailData(usersEmail);
  };

  const addMoreTask = () => {
    setTasks([
      ...tasks,
      { projectStatus: "", workingHour: "", status: "", task: "" },
    ]);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    try {
      await axios.post(
        `${BaseURL}/tasks`,
        {
          email: emailData,
          dueDate: startDate,
          tasks: tasks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        }
      );
      navigate("/daily_status_updates");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
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
          <form onSubmit={handleStatusSubmit}>
            <div>
              <div>
                <p>To</p>
                <Select
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
                                  : prevTask
                              )
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
                          type="text"
                          placeholder="hh:mm"
                          value={task.workingHour}
                          onChange={(e) =>
                            setTasks((prevTasks) =>
                              prevTasks.map((prevTask, i) =>
                                i === index
                                  ? { ...prevTask, workingHour: e.target.value }
                                  : prevTask
                              )
                            )
                          }
                        />
                      </div>
                      <div>
                        <label>Status</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) =>
                            setTasks((prevTasks) =>
                              prevTasks.map((prevTask, i) =>
                                i === index
                                  ? { ...prevTask, status: e.target.value }
                                  : prevTask
                              )
                            )
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="Done">Done</option>
                          <option value="In Processing">In Processing</option>
                          <option value="Testing">Testing</option>
                          <option value="Deployed">Deployed</option>
                        </select>
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
                                  : prevTask
                              )
                            )
                          }
                        />
                      </div>
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
                <div className="daily-statusSave">
                  <button type="text" className="daily-status-savebtn">
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
    </>
  );
};

export default SendMyDailyStatus;
