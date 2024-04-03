import { Alert, ListGroup, Badge, Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function List({
  list,
  onChangeChildPoints,
  color,
  message,
  disabled,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(" ");
  const [itemName, setItemName] = useState(null);
  const [itemPoints, setItemPoints] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  function UpdateList(item) {
    item.name = itemName;
    item.points = itemPoints;
  }

  function handleEdit(item) {
    setItemName(item.name);
    setItemPoints(item.points);
    setIsEdit(true);
    setItemToEdit(item);
  }
  function handleCancel() {
    setItemName("");
    setItemPoints("");
    setErrorMessage("");
    setIsEdit(false);
  }
  function handleSave() {
    if (itemName.trim() && itemPoints > 0) {
      UpdateList(itemToEdit);
      setErrorMessage("");
      setIsEdit(false);
    } else {
      setErrorMessage(" cant save if it is blank");
    }
  }
  return (
    <>
      <Alert>
        <h5 style={{ color: color }}>{message}</h5>
      </Alert>
      {isEdit ? (
        <Form className="summary-edit-form">
          <Form.Label column sm="2">
            Edit Name
          </Form.Label>
          <Form.Control
            type="text"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
              setErrorMessage("");
            }}
          />
          <Form.Label column sm="2">
            Edit Points
          </Form.Label>
          <Form.Control
            type="number"
            value={itemPoints}
            onChange={(e) => {
              setItemPoints(e.target.value);
              setErrorMessage("");
            }}
          />
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Form>
      ) : (
        <>
          {list.map((item) => (
            <ListGroup key={item.id} as="ul" className="summary-list">
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                variant="info"
                disabled={disabled(item)}
                onClick={() => onChangeChildPoints(item)}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="fw-bold">{item.name}</div>
                <Badge bg="primary" pill>
                  {item.points}
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                size="sm"
                as="button"
                action
                variant="light"
                onClick={() => handleEdit(item)}
              >
                edit
              </ListGroup.Item>
            </ListGroup>
          ))}
        </>
      )}
    </>
  );
}
