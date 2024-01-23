import { useState } from "react";
import { Button, Modal, Badge, Stack, Card } from "react-bootstrap";
import Summary from "./Summary";
import FunnyFaces from "./FunnyFaces";

export default function Person({ onDeletChild, onEditChild, child }) {
  const [editPicture, setEditPicture] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditPicture(false);
  };
  const handleShow = () => setShow(true);

  return (
    <article key={child.id} className="child-card">
      <div>
        <img
          className="child-picture"
          src={child.picture}
          alt="carton animal"
        />
        <h1>{child.name}</h1>
        <span
          style={{
            color: child.count < 0 ? "red" : "green",
            margin: "10px",
          }}
        >
          {child.count}
        </span>
      </div>

      <div>
        <Button
          variant="success"
          onClick={() =>
            onEditChild(
              { ...child, count: child.count + 1 },
              `${child.name} earns a point `
            )
          }
        >
          Good Point &#128077;
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            onEditChild(
              { ...child, count: child.count - 1 },
              `${child.name} loses one point `
            )
          }
        >
          Bad Point &#128078;
        </Button>

        <div>
          <h6 href="#" className="show-more" onClick={handleShow}>
            Show More
          </h6>
        </div>
        <div>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="modal-body">
              <Card className="modal-card" style={{ width: "18rem" }}>
                <Card.Img
                  className="modal-picture"
                  variant="top"
                  src={child.picture}
                  alt="child picture"
                />
                <Card.Title>
                  <div
                    className="brush-icon"
                    title="Edit picture"
                    onClick={() => {
                      setEditPicture(!editPicture);
                    }}
                  >
                    &#128396;
                  </div>
                  <h1 style={{ textAlign: "center" }}>
                    {child.name}
                    <Badge pill bg={child.count >= 0 ? "success" : "danger"}>
                      {child.count}
                    </Badge>
                  </h1>
                </Card.Title>
                <Card.Body>
                  {editPicture && (
                    <EditPicture
                      pictures={FunnyFaces}
                      onChoosePicture={(value) => {
                        onEditChild(
                          { ...child, picture: value },
                          `${child.name} changed the picture`
                        );
                      }}
                      onSave={() => {
                        setEditPicture(false);
                      }}
                    />
                  )}
                </Card.Body>
                <Card.Footer>
                  <Button
                    className="delete-button"
                    variant="danger"
                    onClick={() => {
                      onEditChild(child, `${child.name} has been deleted`);
                      onDeletChild();
                    }}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>

              <Summary
                key={child.id}
                child={child}
                onEditPointsByAchievement={onEditChild}
              />
            </Modal.Body>

            <Modal.Footer>
              <UpdateChildName
                child={child}
                onUpdateChildName={(childName) => {
                  onEditChild(
                    {
                      ...child,
                      name: childName,
                    },
                    `${child.name} updated to ${childName}`
                  );
                }}
                handleClose={handleClose}
              />
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </article>
  );
}

function EditPicture({ pictures, onChoosePicture, onSave }) {
  return (
    <section className="edit-picture-container">
      {pictures.map((picture) => (
        <>
          <div>
            <img
              alt="mini-animals"
              src={picture.image_url}
              onClick={() => {
                onChoosePicture(picture.image_url);
              }}
            />
          </div>
        </>
      ))}
      <br />
      <Button variant="outline-info" onClick={onSave}>
        Close
      </Button>
    </section>
  );
}

function UpdateChildName({ child, onUpdateChildName, handleClose }) {
  const [isEdit, setIsEdit] = useState(false);
  const [childName, setChildName] = useState(child.name);
  const [errorMessage, setErrorMessage] = useState("");

  function onClose() {
    setErrorMessage("");
    setIsEdit(false);
    setChildName(child.name);
  }

  return (
    <>
      {isEdit && (
        <div>
          <Stack direction="horizontal" gap={3}>
            <input
              value={childName}
              onChange={(e) => {
                setChildName(e.target.value);
                setErrorMessage("");
              }}
            />
            <Button
              variant="secondary"
              className="button"
              onClick={() => {
                if (childName === child.name) {
                  setIsEdit(!isEdit);
                  return;
                }
                if (childName.trim()) {
                  console.log(childName);
                  setIsEdit(!isEdit);
                  onUpdateChildName(childName);
                } else {
                  setErrorMessage("Can't save if it is blank.");
                }
              }}
            >
              Save
            </Button>
            <div className="vr" />
            <Button
              variant="outline-danger"
              className="button"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
          </Stack>

          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}
      {!isEdit && (
        <div>
          <Button
            variant="secondary"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit
          </Button>
          <div className="vr" />
          <Button variant="secondary" onClick={() => handleClose(onClose)}>
            Close
          </Button>
        </div>
      )}
    </>
  );
}
