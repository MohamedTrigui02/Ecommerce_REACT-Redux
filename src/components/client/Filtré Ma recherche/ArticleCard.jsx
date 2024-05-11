import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { findArticleByscat, getArticles } from '../../../features/articleSlice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalProducts from './ModalProducts'; 
import { CardActions } from '@mui/material'; 
import { addToCart, getTotals } from '../../../features/cartSlice';


const ArticleCard = ({ article }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  const handleShowModal = (selectedArt) => {
    setSelectedArticle(selectedArt);
    setShowModal(true);
  };

  const handleAddToCart = (selectedArt) => {
    dispatch(addToCart(selectedArt));
    dispatch(getTotals());
  };

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img
        height="300px"
        variant="top"
        src={article.imageart}
        alt={article.designation}
        style={{ width: '100%' }}
      />
      <Card.Body>
        <Card.Title>{article.designation}</Card.Title>
        <Card.Text>
          Prix: {article.prix}
        </Card.Text>
      </Card.Body>
      <CardActions>
        <Button
          className="btn-custom btn-add-to-cart"
          disabled={article.qtestock <= 1}
          onClick={() => handleAddToCart(article)}
          variant="contained"
          size="small"
        >
          {article.qtestock <= 1 ? 'OUT OF STOCK' : 'Ajouter'}
        </Button>
        <Button
          className="btn-custom btn-view-product"
          onClick={() => handleShowModal(article)}
          variant="contained"
          size="small"
        >
          Détaille
        </Button>
      </CardActions>

      {showModal && (
        <ModalProducts
        show={showModal}
        handleClose={handleCloseModal}
        art={article}
        handleAddToCart={handleAddToCart}
/>
      )}
    </Card>
  );
};

export default ArticleCard;
