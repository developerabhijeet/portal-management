import React from "react";
import Layout from "../../components/Layout";
import { Col, Form, Row } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./addDiscussion.css"

export const AddDiscussion = () => {
  return (
    <>
      <Layout>
        <div className="bg-dark my-4 container p-0">
          <h3 className="px-3 py-2 m-0" style={{ backgroundColor: "#515151" }}>
            New Discussion Desk
          </h3>
          <div className="p-3 bg-dark m-0">
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="fw" column sm={2}>
                  Topic <span>*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control className="bg-dark text-white border-secondary" type="text" />
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
