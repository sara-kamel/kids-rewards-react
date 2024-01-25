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
  { name: "Help mom in dinner", id: uuidv4(), points: 25 }
];
export default function Summary({ child, onEditPointsByAchievement }) {
  const [list, setList] = useState(child.count >= 1 ? rewards : tasks);

  function UpdateList(item, name, points) {
    item.name = name;
    item.points = points;
    setList(list);
  }
  return (
    <>
      <div>
        <h1>Summary</h1>
        <div key={child.id}>
          {child.count >= 1 && (
            <div>
              <List
                color={"green"}
                message={
                  "congratulations! you did very well, choose a reword! "
                }
                list={list}
                disabled={(item) => {
                  if (item.points > child.count) return true;
                }}
                onChangeChildPoints={(item) => {
                  onEditPointsByAchievement(
                    {
                      ...child,
                      count: child.count - item.points,
                    },
                    ` ${child.name} earned "${item.name}" good job ${child.name}`
                  );
                }}
                onUpdateItem={(item, name, points) => {
                  UpdateList(item, name, points);
                }}
              />
            </div>
          )}
          <div>
            {child.count < 0 && (
              <div>
                <List
                  color={"red"}
                  message={
                    "oh! you need to do tasks to clear your bad points. "
                  }
                  list={tasks}
                  disabled={() => {
                    return false;
                  }}
                  onChangeChildPoints={(item) => {
                    onEditPointsByAchievement(
                      {
                        ...child,
                        count: child.count + item.points,
                      },
                      `${child.name} did task "${item.name}" good Job ${child.name}!`
                    );
                  }}
                  onUpdateItem={(item, name, points) => {
                    UpdateList(item, name, points);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function List({
  list,
  onChangeChildPoints,
  color,
  message,
  disabled,
  onUpdateItem,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPoints, setItemPoints] = useState(null);
  const [item, setItem] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");

  return (
    <>
      <Alert>
        <h5 style={{ color: color }}>{message}</h5>
      </Alert>
      {isEdit && (
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
          <Button
            onClick={() => {
              if (itemName.trim() && itemPoints >= 1) {
                setErrorMessage("");
                onUpdateItem(item, itemName, itemPoints);
                setIsEdit(false);
              } else {
                setErrorMessage(" cant save if it is blank");
              }
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setItemName("");
              setItemPoints("");
              setErrorMessage("");
              setIsEdit(false);
            }}
          >
            Cancel
          </Button>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Form>
      )}
      {!isEdit && (
        <>
          {list.map((item) => (
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
                  onClick={() => {
                    setItem(item);
                    setIsEdit(true);
                    setItemName(item.name);
                    setItemPoints(item.points);
                  }}
                >
                  Edit
                </ListGroup.Item>
              </ListGroup>
            </div>
          ))}
        </>
      )}
    </>
  );
}
