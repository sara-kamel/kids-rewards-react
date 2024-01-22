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
      <Button style={{ float: "right" }} variant="primary" onClick={handleShow}>
        history
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>history:</Offcanvas.Title>
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
        <Button onClick={onClearHistory}>Clear history</Button>
      </Offcanvas>
    </div>
  );
}