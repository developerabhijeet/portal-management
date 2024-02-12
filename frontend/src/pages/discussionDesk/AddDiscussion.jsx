import React from "react";
import Layout from "../../components/Layout";
import { Col, Form, Row } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./addDiscussion.css";

export const AddDiscussion = () => {
  return (
    <>
      <Layout newIndex="6">
        <div className="mt-5 p-4 container">
          <h3
            className="px-3 py-2 m-0"
            style={{ backgroundColor: "#191c24", color: "#60c2cf" }}
          >
            New Discussion Desk
          </h3>
          <div>
            <Form className="p-4" style={{ backgroundColor: "#191c24" }}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="fw" column sm={2}>
                  Topic <span>*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    className="text-white border-secondary"
                    type="text"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="fw" column sm={2}>
                  Detail <span>*</span>
                </Form.Label>
                <Col sm={10}>
                  <Editor
                    wrapperClassName="wrapper"
                    editorClassName="editor"
                    toolbarClassName="toolbar"
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </Layout>
    </>
  );
};
