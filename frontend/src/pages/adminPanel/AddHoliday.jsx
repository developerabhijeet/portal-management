import React, { useEffect, useState } from "react";
import { Button, Form,Table } from "react-bootstrap";
import Layout from "../../components/Layout";
import { newHolidays } from "../../Utils/constant";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { IoCloseSharp } from "react-icons/io5";
import { toast,ToastContainer } from "react-toastify";
import moment from "moment";
const newDate = new Date();
const currentYear = newDate.getFullYear();

export const AddHoliday = () => {
  const [date, setDate] = useState("");
  const [occasion, setOccasion] = useState("");
  const [errors, setErrors] = useState("");
  const [editId,setEditId] = useState(null)
  
  const validateCheck = () => {
    let isValid = true;
    if (!date || !occasion.trim()) {
      isValid = false;
      setErrors("Input field should not be empty");
    }
    return isValid;
  };


  const handleUpdate = (item)=>{
    const {date,occasion,_id} = item;
    const newDate = moment(date);
    const myDate = newDate.format("yyyy-MM-DD");
    setDate(myDate);
    setOccasion(occasion)
    setEditId(_id)
  }
 
  const handleReset = ()=>{
    setEditId(null)
    setDate("")
    setOccasion("")
  }

  const handleAdd = async () => {
    setErrors("");
    if (validateCheck()) {
      const data = {
        date: date,
        occasion: occasion,
      };
      if(editId){
        try {
          const editData = await axios.put(`${BaseURL}/holiDays/${editId}`,data);
          toast.success("Holiday Updated", {
            position: "top-right",
            autoClose: 1500,
          });
          setEditId(null)
          setDate("")
          setOccasion("")
        } catch (error) {console.log(error)}
      }
      else{
        try {
          await axios.post(`${BaseURL}/holiDays`, data);
          toast.success("Holiday Added", {
            position: "top-right",
            autoClose: 1500,
          });
          setDate("")
          setOccasion("")
        } catch (error) {
          toast.error("Something went wrong! please try again", {
            position: "top-right",
            autoClose: 1500,
          });
        }
      }
    }
  };

  return (
    <Layout newIndex="6">
      <div className="containerOne bg">
        <h1 className="headOne">{editId ? "Update":"Add"} Holiday</h1>
        <Form className="p-3">
          {errors ? (
            <div
              className="d-flex align-items-center justify-content-between mb-3 p-1 px-2"
              style={{ backgroundColor: "#2c3b3a" }}
            >
              <p className="text-danger m-0">{errors}</p>
              <IoCloseSharp color="red" onClick={() => setErrors("")} />
            </div>
          ) : null}
          {newHolidays.map((item, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Text>{item.label}</Form.Text>
              <Form.Control
                name={item.name}
                type={item.type}
                value={item.name == "date" ?date:occasion}
                onChange={(e) => {
                  if (item.name === "date") {
                    setDate(e.target.value);
                  }
                  if (item.name === "occasion") {
                    setOccasion(e.target.value);
                  }
                }}
                style={{ colorScheme: "dark" }}
              />
            </Form.Group>
          ))}
          <Button variant="outline-success" onClick={() => handleAdd()}>
          {editId ? "Update":"Add"}
          </Button>
         
          <Button variant="outline-primary"  className="ms-3" onClick={handleReset}>
          {editId ? "Cancel":"Reset"}
          </Button>
        </Form>
      </div>
      <MyHolidays handleUpdate={handleUpdate}/>
      <ToastContainer/>
    </Layout>
  );
};

export const MyHolidays = ({handleUpdate}) => {
  const [allHolidays, setAllHolidays] = useState([]);
  const role = localStorage.getItem("role");
  console.log(typeof(handleUpdate))
  const fetchHoliday = async () => {
    try {
      const res = await axios.get(`${BaseURL}/holiDays`);
      const data = res.data.holiDays;
      setAllHolidays(data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    fetchHoliday();
  }, [allHolidays]);


  const handleDelete = async (item) => {
    try {
      await axios.delete(`${BaseURL}/holiDays/${item._id}`);
    } catch (error) {
      toast.error("Something went wrong! please try again", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <div className="container mt-5 p-0">
        <h3 className="bg text-brand px-3 py-2 m-0">
          Holiday Calendar <span>{currentYear}</span>
        </h3>
        <div className="p-3 bg m-0">
          <Table hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Occassion</th>
                <th>Days</th>
                {role === "admin"  && typeof(handleUpdate) !== "string"? <th></th> : null}
              </tr>
            </thead>
            <tbody>
              {allHolidays.map((item, index) => {
                const date = new Date(item.date);
                const days = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ];
                const day = days[date.getDay()];
                const newDate = date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <tr key={index}>
                    <td>{newDate}</td>
                    <td>{item.occasion}</td>
                    <td>{day}</td>
                    {role === "admin"  && typeof(handleUpdate) == "function" ? (
                      <td>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="mx-3"
                          onClick={() => handleUpdate(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="mx-0"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </Button>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};