import React from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="mb-3 ">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...field} {...props} style={{ backgroundColor: "black", color: "#fff" }}/>
        {meta.touched && meta.error ? <p className="error">{meta.error}</p>: null}
      </Form.Group>
    </>
  );
};

export default Input;