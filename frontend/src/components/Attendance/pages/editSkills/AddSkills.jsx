import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";

export const AddSkills = () => {
  const [beginnerTech, setBeginnerTech] = useState([]);
  const [intermediateTech, setIntermediateTech] = useState([]);
  const [proficientTech, setProficientTech] = useState([]);
  const label = ["Beginner", "Intermediate", "Proficient"];
  const options = [
    {
      value: 1,
      label: "Python",
    },
    {
      value: 2,
      label: "ROR",
    },
    {
      value: 3,
      label: "React Native",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3
          style={{ backgroundColor: "#616161", margin: 0, padding: "5px 16px" }}
        >
          Add Skills
        </h3>
        <div
          style={{
            padding: "16px",
            backgroundColor: "#212529",
            margin: 0,
            alignItems: "center",
          }}
        >
          <Form>
            {label.map((val) => (
              <Form.Group
                key={val}
                as={Row}
                className="mb-3 align-items-center"
              >
                <Form.Label column sm={2}>
                  {val} Technology
                </Form.Label>
                <Col sm={10}>
                  <Select
                    multi
                    searchable
                    placeholder=""
                    color="#818181"
                    style={{
                      color: "#000",
                      backgroundColor: "#212121",
                      border: "1px solid #515151",
                    }}
                    options={options}
                    onChange={(values) => {
                      if (val === "Beginner") {
                        setBeginnerTech(values);
                      } else if (val === "Intermediate") {
                        setIntermediateTech(values);
                      } else if (val === "Proficient") {
                        setProficientTech(values);
                      }
                    }}
                  />
                </Col>
              </Form.Group>
            ))}
          </Form>
          <div style={{ textAlign: "center" }}>
            <Button onClick={()=>navigate("/edit_skills")} variant="success">
              UPDATE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
