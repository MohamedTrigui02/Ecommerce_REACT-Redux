import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalArt.css'; // Importez votre fichier CSS pour le style du modal
import { Rating } from '@mui/material';

const ModalArtPromo = ({ show, handleClose, artp, handleAddToCart }) => {
  const [ratingValue, setRatingValue] = useState(2.5); // État pour stocker la valeur du rating

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
  };

    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">{artp?.reference}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={artp?.imageart} alt={artp?.reference} style={{ maxWidth: '100%' }} />
          <p className="modal-price">Ancien Prix : <strike>  {artp?.newprix} DT</strike></p>
          <p className="modal-new-price">Nouveau Prix :{artp?.prix}  DT</p>
          <div className='half-rating' >
          <Rating
          name="half-rating"
          value={ratingValue}
          precision={0.5}
          onChange={handleRatingChange} // Appel à la fonction de gestion du changement
        />
</div>

          {/* Ajoutez d'autres détails de l'article ici */}
          <Button className="btn-add-to-cart" onClick={() => handleAddToCart(artp)}>
            Ajouter au panier
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
export default ModalArtPromo;
