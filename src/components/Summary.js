import { v4 as uuidv4 } from "uuid";
import { Alert, ListGroup, Badge, Form, Button } from "react-bootstrap";
import { useState } from "react";

const rewards = [
  { name: "High Five", id: uuidv4(), points: 1 },
  { name: "Small Prize", id: uuidv4(), points: 5 },
  { name: "Choose ext day lunch", id: uuidv4(), points: 10 },
  { name: "New toy", id: uuidv4(), points: 20 },
  { name: "Movie night", id: uuidv4(), points: 30 },
  { name: "New clothes or shoes ", id: uuidv4(), points: 40 },
  { name: "Have lunch outside", id: uuidv4(), points: 50 },
];
const tasks = [
  { name: "Help other", id: uuidv4(), points: 2 },
  { name: "Cleaning", id: uuidv4(), points: 5 },
  { name: "Tide up clothes", id: uuidv4(), points: 8 },
  { name: "Work out", id: uuidv4(), points: 20 },
  { name: "Help in lundry", id: uuidv4(), points: 15 },
  { name: "Do vacuum", id: uuidv4(), points: 30 },
  { name: "Help mom in dinner", id: uuidv4(), points: 25 },
];

export default function Summary({ child, onEditPointsByAchievement }) {
  function handleChange(item) {
    if (child.count > 0)
      onEditPointsByAchievement(
        {
          ...child,
          count: child.count - item.points,
        },
        ` ${child.name} earned "${item.name}" good job ${child.name}`
      );
    else {
      onEditPointsByAchievement(
        {
          ...child,
          count: child.count + item.points,
        },
        `${child.name} did task "${item.name}" good Job ${child.name}!`
      );
    }
  }
  return (
    <>
      <div>
        <h1>Summary</h1>
        <div key={child.id}>
          {child.count > 0 && (
            <List
              color={"green"}
              message={"congratulations! you did very well, choose a reword! "}
              list={rewards}
              disabled={(item) => {
                if (item.points > child.count) return true;
              }}
              onChangeChildPoints={(item) => handleChange(item)}
            />
          )}
          {child.count < 0 && (
            <List
              color={"red"}
              message={"oh! you need to do tasks to clear your bad points. "}
              list={tasks}
              disabled={() => {
                return false;
              }}
              onChangeChildPoints={(item) => handleChange(item)}
            />
          )}
        </div>
      </div>
    </>
  );
}

function List({ list, onChangeChildPoints, color, message, disabled }) {
  const [isEdit, setIsEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(" ");
  const [itemName, setItemName] = useState(null);
  const [itemPoints, setItemPoints] = useState(null);
  const [listItems, setlistItems] = useState(list);
  const [eidtedItem, setEditedItem] = useState("");

  function UpdateList(item, name, points) {
    item.name = name;
    item.points = points;
    setlistItems([...listItems, { item }]);
  }

  function handleEdit(item) {
    setItemName(item.name);
    setItemPoints(item.points);
    setIsEdit(true);
    setEditedItem(item);
  }
  function handleCancel() {
    setItemName("");
    setItemPoints("");
    setErrorMessage("");
    setIsEdit(false);
  }
  function handleSave() {
    if (itemName.trim() && itemPoints > 0) {
      setErrorMessage("");
      UpdateList(eidtedItem, itemName, itemPoints);
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
        <div>
          {listItems.map((item) => (
            <div key={item.id}>
              <ListGroup as="ul" className="summary-list">
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
            </div>
          ))}
        </div>
      )}
    </>
  );
}
