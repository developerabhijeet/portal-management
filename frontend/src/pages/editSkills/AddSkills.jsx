import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { options } from "../../Utils/constant";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
export const AddSkills = () => {
  const [beginnerTech, setBeginnerTech] = useState([]);
  const [intermediateTech, setIntermediateTech] = useState([]);
  const [proficientTech, setProficientTech] = useState([]);
  const label = ["Beginner", "Intermediate", "Proficient"];
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <div className="container mt-4">
          <h3 className="px-3 py-2 m-0" style={{ backgroundColor: "#515151" }}>
            Add Skills
          </h3>
          <div className="p-3 bg-dark m-0">
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
                      style={{ colorScheme: "dark" }}
                      placeholder="Select Technology"
                      color="#717171"
                      className="text-secondary border border-secondary"
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
              <Button
                onClick={() => navigate("/edit_skills")}
                variant="success"
              >
                UPDATE
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
