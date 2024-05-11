import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../client/ModalArt.css'; // Importez votre fichier CSS pour le style du modal

const ModalArt = ({ show, handleClose, art, handleAddToCart }) => {

    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">{art?.reference}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={art?.imageart} alt={art?.reference} style={{ maxWidth: '100%' }} />
          <p className="modal-price">Prix : {art?.prix} DT</p>

          
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
  
export default ModalArt;
