import { v4 as uuidv4 } from "uuid";
import { Alert, ListGroup, Badge } from "react-bootstrap";

export default function Summary({ child, onEditPointsByAchievement }) {
  const rewards = [
    { name: "High Five", id: uuidv4(), points: 1 },
    { name: "small prize", id: uuidv4(), points: 5 },
    { name: "choose next day lunch", id: uuidv4(), points: 10 },
    { name: "new toy", id: uuidv4(), points: 20 },
    { name: "movie night", id: uuidv4(), points: 30 },
    { name: "new clothes or shoes ", id: uuidv4(), points: 40 },
    { name: "have lunch outside", id: uuidv4(), points: 50 },
  ];
  const tasks = [
    { name: "help other", id: uuidv4(), points: 2 },
    { name: "cleaning", id: uuidv4(), points: 5 },
    { name: "tide up clothes", id: uuidv4(), points: 8 },
    { name: "work out", id: uuidv4(), points: 10 },
  ];

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
                list={rewards}
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
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function List({ list, onChangeChildPoints, color, message, disabled }) {
  return (
    <>
      <Alert>
        <h5 style={{ color: color }}>{message}</h5>
      </Alert>
      {list.map((item) => (
        <div key={item.id}>
          <ListGroup as="ul">
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
          </ListGroup>
        </div>
      ))}
    </>
  );
}
