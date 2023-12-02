import "./CardComponent.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



const CardComponent = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showFavorite, setFavorite] = useState(!!props.favorite)
  console.log(showFavorite)
  const handleDeleteClick = () => {
    console.log("BizCard clicked", props);
    props.onDeleteCard(props.id);
    setShowModal(false);
  }
  const handleFavoriteClick = () => {
    console.log("BizCard clicked", props);
    setFavorite(!showFavorite);
    props.onToggleFavoriteCard(props.id);
  };

  return (
    <React.Fragment>
      <Col className=" mb-3 ">
      <div className="card h-100" >
        <img src={props.image} className="card-img-top card-img-size" alt="..." />
        <div className="card-body bg-light">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <h6 className="card-subtitle mb-2 font-bolder">{props.phone}</h6>
          <h6 className="card-subtitle mb-2">{props.address}</h6>
        </div>
        <div className="card-footer">
          <Row className="bg-light">
              {props.userIDCard === props.userIDLoggedIn ?
               <div className="col-8">
                  <button type="button" className="btn btn-outline-primary" style={{width:'30%'}}  onClick={() => setShowModal(true)}>
                    Delete
                  </button>
                  <Link to={`/EditCard/${props.id}`}>
                    <button type="button" className="btn btn-outline-primary" style={{width:'30%', marginLeft:'0.5rem'}} >
                      Edit
                    </button>
                  </Link>
                  </div>
              :
              <div className="col-8"></div>
            }
            <div className="col-4 text-end">
              {props.onToggleFavoriteCard && (
                <button type="button" className={"btn "+ (showFavorite ? "btn-danger": "btn-outline-danger")} style={{width:'60%'}} onClick={handleFavoriteClick}>
                  ♥
                </button>
              )}
          </div>
          </Row>
        </div>
        </div>
        </Col>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this card?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default CardComponent;
