import { useState } from 'react'
import { Button, Modal, Badge, Card } from 'react-bootstrap'
import Summary from './Summary'
import FunnyFaces from './FunnyFaces'
import UpdateChildName from './UpdateChildName'

export default function Child ({ onDeletChild, onEditChild, child }) {
  const [isEditPicture, setIsEditPicture] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    setIsEditPicture(false)
  }
  const handleShow = () => setShow(true)

  return (
    <article key={child.id} className='child-card'>
      <div>
        <img
          className='child-picture'
          src={child.picture}
          alt='carton animal'
        />
        <h1>{child.name}</h1>
        <span
          style={{
            color: child.count < 0 ? 'red' : 'green',
            margin: '10px'
          }}
        >
          {child.count}
        </span>
      </div>

      <div>
        <Button
          variant='success'
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
          variant='danger'
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
          <h6 href='#' className='show-more' onClick={handleShow}>
            Show More
          </h6>
        </div>
        <div>
          <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className='modal-body'>
              <Card className='modal-card' style={{ width: '18rem' }}>
                <Card.Img
                  className='modal-picture'
                  variant='top'
                  src={child.picture}
                  alt='child picture'
                />
                <Card.Title>
                  <div
                    className='brush-icon'
                    title='Edit picture'
                    onClick={() => {
                      setIsEditPicture(!isEditPicture)
                    }}
                  >
                    &#128396;
                  </div>
                  <h1 style={{ textAlign: 'center' }}>
                    {child.name}
                    <Badge pill bg={child.count >= 0 ? 'success' : 'danger'}>
                      {child.count}
                    </Badge>
                  </h1>
                </Card.Title>
                <Card.Body>
                  {isEditPicture && (
                    <section className='edit-picture-container'>
                      {FunnyFaces.map(picture => (
                        <>
                          <div>
                            <img
                              alt='mini-animals'
                              src={picture.image_url}
                              onClick={() => {
                                onEditChild(
                                  { ...child, picture: picture.image_url },
                                  `${child.name} changed the picture`
                                )
                              }}
                            />
                          </div>
                        </>
                      ))}
                      <br />
                      <Button
                        variant='outline-info'
                        onClick={() => setIsEditPicture(false)}
                      >
                        Close
                      </Button>
                    </section>
                  )}
                </Card.Body>
              </Card>
              <Summary
                key={child.id}
                child={child}
                onEditPointsByAchievement={onEditChild}
              />
            </Modal.Body>

            <Modal.Footer
              style={{ justifyContent: 'space-between', marginBottom: '20px' }}
            >
              <Button
                variant='danger'
                onClick={() => {
                  onEditChild(child, `${child.name} has been deleted`)
                  onDeletChild()
                }}
              >
                Delete
              </Button>
              <UpdateChildName
                child={child}
                onUpdateChildName={childName => {
                  onEditChild(
                    {
                      ...child,
                      name: childName
                    },
                    `${child.name} updated to ${childName}`
                  )
                }}
                onClose={handleClose}
              />
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </article>
  )
}
