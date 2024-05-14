import { v4 as uuidv4 } from "uuid";
import List from "./List";

const rewards = [
  { name: "High Five", id: uuidv4(), points: 1 },
  { name: "Small Prize", id: uuidv4(), points: 5 },
  { name: "Choose next day lunch", id: uuidv4(), points: 10 },
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
  { name: "Help in laundry", id: uuidv4(), points: 15 },
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
