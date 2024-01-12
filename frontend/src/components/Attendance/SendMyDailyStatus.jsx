import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SendMyDailyStatus = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [project_status, setProjectStatus] = useState("");
  const [status, setStatus] = useState("");
  const [working_hour, setWorkingHour] = useState("");
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  const handleFilter = (value) => {
    const res = data.filter((f) => f.email.toLowerCase().includes(value));
    setFilteredData(res);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4500/post_daily_status",{ withCredentials: true }, {
        email,
        date: startDate,
        project_status,
        status,
        working_hour,
        task,
      });
      const { success, message } = response.data;
      if (success) {

      } else {
        console.log(message);
      }
    } catch (error) {
      console.error("Login error", error);
    }
    navigate("/daily_status_updates");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:4500/getEmail");
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);


  return (
    <>
      <div className="status-update-form panel panel-info">
        <div className="panel-heading">
          <h2 className="panel-title">Send Daily Status Update</h2>
        </div>
        <div className="available">
          <p>
            <a href="employee_availabilities">Do you want to change your availability?</a>
          </p>
          <p>Available</p>
        </div>
        <div>
          <form onSubmit={handleStatusSubmit}>
            <div>
              <div>
                <p>To</p>
                <input
                  className="toinputbox"
                  placeholder="Search for..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  this.props && this.props.partners.length > 0 ?
                  filteredData &&filteredData.length>0?.map((item, index) => (
                    <p key={index}>{item.email}</p>
                  ))
                )} */}
              <div>
                <p>CC</p>
                <p>status@bestpeers.com</p>
                <div>
                  <label>Status Date</label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} required dateFormat="dd/MM/yy" />
                </div>
              </div>
              <div>
                <div>
                  <h6>+ ADD YOUR TASK DETAILS</h6>
                </div>
                <div>
                  <label>Project</label>
                  <select className="form-select" aria-label="Default select example" onChange={(e) => setProjectStatus(e.target.value)}>
                    <option value="">Select Project</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div>
                  <label>Working Hours</label>
                  <input
                    type="text"
                    placeholder="hh:mm"
                    value={working_hour}
                    onChange={(e) => setWorkingHour(e.target.value)}
                  />
                </div>
                <div>
                  <label>Status</label>
                  <select className="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Done">Done</option>
                    <option value="In Processing">In Processing</option>
                    <option value="Testing">Testing</option>
                    <option value="Deployed">Deployed</option>
                  </select>
                </div>
                <div>
                  <label>Task</label>
                  <textarea className="task-input" value={task} onChange={(e) => setTask(e.target.value)} />
                </div>
              </div>
              <div className="daily-status">
                <button type="text" className="daily-status-btn">
                  + ADD MORE TASK
                </button>
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
