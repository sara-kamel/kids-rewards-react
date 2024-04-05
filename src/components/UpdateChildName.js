import { useState } from "react";
import { Button, Stack, Form } from "react-bootstrap";

export default function UpdateChildName({ child, onUpdateChildName, onClose }) {
  const [isEdit, setIsEdit] = useState(false);
  const [childName, setChildName] = useState(child.name);
  const [errorMessage, setErrorMessage] = useState("");

  function handleClose() {
    setErrorMessage("");
    setIsEdit(false);
    setChildName(child.name);
  }

  function handleSave() {
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
  }
  return (
    <>
      {isEdit && (
        <div>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              value={childName}
              onChange={(e) => {
                setChildName(e.target.value);
                setErrorMessage("");
              }}
            />
            <Button variant="secondary" className="button" onClick={handleSave}>
              Save
            </Button>
            <div className="vr" />
            <Button
              variant="outline-danger"
              className="button"
              onClick={() => {
                handleClose();
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
          <Button variant="secondary" onClick={() => onClose(handleClose)}>
            Close
          </Button>
        </div>
      )}
    </>
  );
}
