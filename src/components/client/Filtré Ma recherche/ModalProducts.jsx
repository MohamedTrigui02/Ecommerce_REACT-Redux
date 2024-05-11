import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Rating } from '@mui/material';
import './ModalArticles.css';

const ModalProducts = ({ show, handleClose, art, handleAddToCart }) => {

    const [ratingValue, setRatingValue] = useState(2.5); 

    const handleRatingChange = (event, newValue) => {
      setRatingValue(newValue);
    };
  
      return (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">{art?.reference}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={art?.imageart} alt={art?.reference} style={{ maxWidth: '100%' }} />
            <p className="modal-new-price">Prix :{art?.prix}  DT</p>
            <p className="">{art?.designation} </p>

            <div className='half-rating' >
            <Rating
            name="half-rating"
            value={ratingValue}
            precision={0.5}
            onChange={handleRatingChange}
          />
  </div>
  
          
            <Button className="btn-add-to-cart" onClick={() => handleAddToCart(art)}>
              Ajouter au panier
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Fermer</Button>
          </Modal.Footer>
        </Modal>
      );
    };
  export default ModalProducts;
