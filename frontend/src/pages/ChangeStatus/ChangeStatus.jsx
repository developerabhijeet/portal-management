import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ChangeStatus = ({ showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false);
  const [moreOptions, setMoreOptions] = useState(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Status</Form.Label>
            <Form.Select
              style={{ marginBottom: 10 }}
              onChange={(e) => {
                if (e.target.value === "I am available partially")
                  setMoreOptions(true);
                else setMoreOptions(false);
              }}
            >
              <option value="I am avialable for any new work">
                I am available for any new work
              </option>
              <option value="I am busy for assigned work">
                I am busy for assigned work
              </option>
              <option value="I am available partially">
                I am available partially
              </option>
            </Form.Select>
            {moreOptions && (
              <>
                <Form.Label>
                  How Many Hours?
                </Form.Label>
                <Form.Control type="time" style={{ marginBottom: 10 }} />
              </>
            )}
            <Form.Label>Any Note</Form.Label>
            <Form.Control as="textarea" rows={2} style={{ marginBottom: 10 }} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Change Availability
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeStatus;
