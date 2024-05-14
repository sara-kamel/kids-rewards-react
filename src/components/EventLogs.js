import { useState } from "react";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ListGroup } from "react-bootstrap";

export default function EventLogs({ eventLogs, onClearHistory }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reverseENentLogs = [...eventLogs].reverse();

  return (
    <div>
      <Button
        style={{ float: "right" }}
        variant="outline-info"
        onClick={handleShow}
      >
        History
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>History:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {reverseENentLogs.map((event) => (
            <ListGroup>
              <ListGroup.Item variant="info">
                {event.event}
                <span className="time-event-logs">{event.time}</span>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </Offcanvas.Body>
        <Button
          variant="outline-info"
          onClick={onClearHistory}
          style={{ marginBottom: "30px" }}
        >
          Clear history
        </Button>
      </Offcanvas>
    </div>
  );
}
