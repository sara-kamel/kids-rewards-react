import React from "react";
import Person from "./components/Person";
import AddChild from "./components/AddChild";
import EventLogs from "./components/EventLogs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Alert } from "react-bootstrap";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

export default function App() {
  const [eventLogs, setEventLogs] = useState(() => {
    const locelStorgeEvents = localStorage.getItem("events");
    if (locelStorgeEvents) {
      return JSON.parse(locelStorgeEvents);
    }
    return [];
  });

  const [children, setChildren] = useState(() => {
    const locelStorge = localStorage.getItem("children");
    if (locelStorge) {
      return JSON.parse(locelStorge);
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem("children", JSON.stringify(children));
  }, [children]);
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(eventLogs));
  }, [eventLogs]);

  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = currentDate.toLocaleString("en-US", options);
  console.log(formattedDate);

  function onUpdateChild(child, event) {
    let newChildrenList = [...children];
    let findChild = newChildrenList.find((c) => c.id === child.id);
    findChild.name = child.name;
    findChild.picture = child.picture;
    findChild.count = child.count;
    setChildren(newChildrenList);
    setEventLogs([...eventLogs, { event: event, time: formattedDate }]);
  }

  return (
    <div className="main-page">
      <Header />
      <AddChild
        onAddChild={(childName, picture, event) => {
          setChildren([
            ...children,
            { id: uuidv4(), name: childName, count: 0, picture: picture },
          ]);
          setEventLogs([...eventLogs, { event: event, time: formattedDate }]);
        }}
      />
      <br />

      <Alert variant="light">
        <EventLogs
          eventLogs={eventLogs}
          onClearHistory={() => {
            setEventLogs([]);
          }}
        />
        <h1>Children List</h1>
      </Alert>
      <br />
      <div className="children-list">
        {children.map((child) => (
          <>
            <Person
              key={child.id}
              child={child}
              onEditChild={onUpdateChild}
              onDeletChild={() => {
                setChildren(children.filter((a) => a.id !== child.id));
              }}
            />
            <hr />
          </>
        ))}
      </div>
      <Footer />
    </div>
  );
}
