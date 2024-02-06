import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BaseURL } from "../../Utils/utils";
import Layout from "../../components/Layout";
import "../index.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button, Form } from "react-bootstrap";
import { statusOption } from "../../Utils/constant";
import { useLocation } from "react-router-dom";
import OptionsSelect from "../../components/selectOption/selectOption";
import ChangeStatus from "../ChangeStatus/ChangeStatus";

const SendMyDailyStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState([]);
  const [projectUpdate, setProjectUpdate] = useState([]);
  const [editData,setEditData] = useState(false)
  const [editId,setEditId] = useState(null)
  const [tasks, setTasks] = useState([
    {
      projectStatus: "none",
      workingHour: "09:00",
      status: "",
      task: "",
    },
  ]);
  const navigate = useNavigate();
  const location = useLocation()
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
  }, [navigate]);

  useEffect(()=>{
    if(location.state!==null){
      setEditData(true)
      setEditId(location.state.item._id)
      updateStatus()
    }
  },[location.state])

  const updateStatus = ()=>{
    const {dueDate,tasks,email} = location.state.item
    let d= new Date(dueDate)
    d = d.toLocaleDateString()
    setStartDate(new Date(d))
    setTasks([...tasks])
    setEmail([...email])
  }

  const handleUpdate = async(e,completed)=>{
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
      setEditData(false)
      navigate("/daily_status_updates");
    } catch (error) {
      alert(error);
    }
  }

  const createEmailObjects = (emailArray) =>
    emailArray.map((email) => ({ value: email, label: email }));

  const handleEmail = (selectedOptions) => {
    const usersEmail = selectedOptions.map((e) => e.value);
    setEmail(usersEmail);
  };

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
        const projectSelect = ["None", ...projects.map((option) => option.projectName)];;
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
        <div className="status-update-form-main main-container">
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
          <div className="form-container">
            <Form.Group className="mb-3 email-box">
              <div className="mail">
                <Form.Label>To</Form.Label>
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
                      backgroundColor: "black",
                      marginRight: -20,
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
              <div>
                <Form.Label >CC</Form.Label>
                <p>status@bestpeers.com</p>
              </div>
              <div>
                <Form.Label>status date</Form.Label>
                <div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                    dateFormat="dd/MM/yy"
                    className="custom-datepicker"
                  />
                </div>
              </div>
            </Form.Group>
            <form onSubmit={(e) => handleStatusSubmit(e, true)}>
              <div>
            <div className="addtask">
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
                        <Form.Label >Working Hours</Form.Label>
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
                        <Form.Label >Status</Form.Label>
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
                        <RiDeleteBin6Line color="red" onClick={deleteTask} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           
               
                <Button
                  type="button"
                  className="daily-status-btn btn"
                  onClick={addMoreTask}
                >
                  + ADD MORE TASK
                </Button>
                  {editData !== true? 
                <div className="save_send_btn_container">
                  <div className="daily-statusSave">
                    <Button
                      type="button"
                      className="daily-status-savebtn btn"
                      onClick={(e) => handleStatusSubmit(e, false)}
                    >
                      SAVE TO DRAFT
                    </Button>
                  </div>
                  <div className="daily-status-sendbtn">
                    <Button type="submit" className="daily-status-btnsend btn">
                      SEND
                    </Button>
                  </div>

                </div>
                 :  
                 <div className="save_send_btn_container">
                 <Button className="btn" onClick={(e)=>handleUpdate(e,true)}>Update</Button>
                 </div>
                   }
              </div>
            </form>
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

