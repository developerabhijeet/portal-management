import React from "react";
import { useFormik } from "formik";
import moment from 'moment'
import "../../../index.css"
import * as Yup from "yup"
import {ThemeProvider,createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const InterviewCalls = () => {
  const countryValidationSchema = Yup.object({
    country:Yup.object().shape({
      value:Yup.string().required(),
      label:Yup.string().required()
    })
  })

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    round: Yup.number().required(),
    Dev_Profile: Yup.string().required(),
    email: Yup.string().email().required(),
    country: countryValidationSchema,
    technology:Yup.string().required(),
    time:Yup.date().required(),
    CV:Yup.mixed().required(),
    salary:Yup.string().required(),
    salary: Yup.string()
    .required("Expected Salary is required")
    .matches(/^\$\d+\sUSD\/Month$/, "Invalid salary format. Use $X USD/Month"),
    details:Yup.string().required()
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      round: null,
      Dev_Profile:"",
      email:"",
      country: null,
      technology:"",
      time:"",
      CV:null,
      salary:"",
      details:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formattedTime = moment(values.time).format("DD-MMM-YYYY hh:mm A");
      values.time = formattedTime;
      console.log("formValues", values);
    },
  });

  return (
    <>
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <h5>Interviews</h5>
      <div className="fieldStyle">
        <form onSubmit={formik.handleSubmit}>
          <div className="fieldStyle">
          <label htmlFor="name">Assigned to:</label>
          <input
            type="text"
            id="name"
            name="name" 
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <span className='text-red-400'>{formik.errors.name}</span>
          ): null}
         </div>
         <div className="fieldStyle">
          <label htmlFor="round">Round:</label>
          <input
            min={1}
          max={10}
            type="number"
            id="round"
            name="round" 
            value={formik.values.number}
            onChange={formik.handleChange}
          />
          {formik.touched.round && formik.errors.round ? (
            <span>{formik.errors.round}</span> 
          ) : null}
          </div>
          <div className="fieldStyle">
          <label htmlFor="profile">Developers Profile:</label>
          <input type="text"  name="Dev_Profile" id="profile" value={formik.values.Dev_Profile}  onChange={formik.handleChange}/>
          {formik.touched.Dev_Profile && formik.errors.Dev_Profile ? (
            <span>{formik.errors.Dev_Profile}</span>
          ): null}
          </div>
         
          <div className="fieldStyle">
          <label htmlFor="email">Profile Email:</label>
          <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} />
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ): null}
          </div>
        {/* <div className="fieldStyle">
        <label htmlFor="country">Country:</label>
        <div>{formik.values.country ? formik.values.country.label : ''}</div> 
        <SelectCom
          value={formik.values.country}
          onChange={(selectedOption) => {
            formik.setFieldValue("country", selectedOption);
          }}
          onBlur={() => {
            formik.setFieldTouched("country", true);
          }}
        />
        {formik.touched.country && formik.errors.country ? (
          <span>{formik.errors.country}</span>
        ) : null}
       </div> */}
        <div className="fieldStyle">
          <label htmlFor="tech">Technology:</label>
          <input type="text" id="tech"  name="technology" value={formik.values.technology} onChange={formik.handleChange}/>
          {formik.touched.technology && formik.errors.technology ? (
            <span>{formik.errors.technology}</span>
          ): null}
          </div>
          
          <div className="fieldStyle">
            <label htmlFor="time">Scheduled At:</label>
            <input
              type="datetime-local"
              id="time"
              name="time"
              value={formik.values.time}
              onChange={formik.handleChange}
            />
            {formik.touched.time && formik.errors.time ? (
            <span>{formik.errors.time}</span>
          ): null}
          </div>
          <div className="fieldStyle">
          <label htmlFor="cv" >CV:</label>
          <input id="cv" type="file"
          onChange={(e) => {
            formik.setFieldValue("CV",e.currentTarget.files[0])
          }}
          />
           {formik.touched.CV && formik.errors.CV ? (
            <span>{formik.errors.CV}</span>
          ): null}
          </div>

          <div className="fieldStyle">
          <label htmlFor="salary">Expected Salary:</label>
          <input id="salary" type="text" onChange={formik.handleChange} />
          {formik.touched.salary && formik.errors.salary ? (
            <span>{formik.errors.salary}</span>
          ): null}
          </div>
          
          <div className="fieldStyle">
          <label htmlFor="details">Details:</label>
          <textarea id="details" type="text" name="details" value={formik.values.details} onChange={formik.handleChange}/>
          {formik.touched.details && formik.errors.details ? (
            <span>{formik.errors.details}</span>
          ) : null}
         </div>
          <button type="submit">Submit</button>
         </form>
      </div>
      </ThemeProvider>
    </>
    
  );
};
export default InterviewCalls;
