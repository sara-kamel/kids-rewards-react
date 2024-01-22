import FunnyFaces from "./FunnyFaces";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function AddChild({ onAddChild }) {
  const [childName, setChildName] = useState("");
  const [childPicture, setChildPicture] = useState(null);
  const [pictureId, setPictureId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPicture, setShowPicture] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onHandleClose = () => {
    setShowPicture(false);
    setChildPicture(null);
    setShowForm(!showForm);
    setErrorMessage("");
    setChildName("");
    setPictureId(null);
  };
  return (
    <section>
      <Button
        variant="outline-primary"
        onClick={() => {
          onHandleClose();
        }}
      >
        <FiPlus />
        Add Child
      </Button>

      <article
        className="add-child-form"
        style={{ display: showForm ? "block" : "none" }}
      >
        <label>
          <b>Put your Child Name:</b>{" "}
        </label>
        <br />
        <input
          value={childName}
          onChange={(e) => {
            setChildName(e.target.value);
            setErrorMessage("");
          }}
        />
        <Button onClick={() => setShowPicture(true)} variant="info">
          choose picture
        </Button>

        <br />
        <figure>
          {showPicture &&
            FunnyFaces.map((face) => (
              <img
                className="child-picture"
                onClick={() => {
                  setChildPicture(face.image_url);
                  setPictureId(face.id);
                }}
                src={face.image_url}
                alt="funny faces"
                style={{
                  border: pictureId === face.id ? "3px solid red" : "none",
                }}
              />
            ))}
        </figure>

        <br />
        <Button
          variant="outline-success"
          onClick={() => {
            if (childName.trim() && childPicture) {
              onAddChild(
                childName,
                childPicture,
                `${childName} has been added!`
              );
              onHandleClose();
            } else {
              setErrorMessage("please! add child name and choose picture.");
            }
          }}
        >
          Save
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            onHandleClose();
          }}
        >
          Cancel
        </Button>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </article>
    </section>
  );
}
