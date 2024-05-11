import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
//import 'react-multi-carousel/lib/styles.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ModalArt from './ModalArt';
import './AfficheArticles.css';
import { addToCart, getTotals } from '../../features/cartSlice';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const AfficheArticles = () => {
  const { articles } = useSelector((state) => state.storearticles);
  const dispatch = useDispatch();
  const [autoPlay, setAutoPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);
    const [article, setArticle] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setArticle(null);
  };

  const handleShowModal = (art) => {
    setArticle(art);
    setShowModal(true);
  };

  const handleAddToCart = (art) => {
    dispatch(addToCart(art));
    dispatch(getTotals());
  };

  const carouselOptions = {
    itemClass: 'image-item',
    responsive: responsive,
    autoPlay: autoPlay,
    autoPlaySpeed: 3000,
    afterChange: (previousSlide, nextSlide) => {
      if (nextSlide === articles.length - 1) {
        setAutoPlay(false);
      }
    },
  };

  return (
    <>
      <div className="text-container">
        <p id="textToShowHide" className="hidden">Notre Large Gamme des produits</p>
      </div>

      <div className="carousel-container" style={{ backgroundColor: '#ffffff' }}>
        <Carousel {...carouselOptions}>
          {articles.map((art) => (
            <Card key={art._id} className="customm-card">
              <CardMedia
                component="img"
                height="200px"
                image={art.imageart}
                alt="Product Image"
                onClick={() => handleShowModal(art)}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" fontSize={18}  component="div">
                  {art.designation}
                </Typography>
                <Typography variant="body2" fontSize={21} color="black">
           <b>     Prix : {art.prix} DT</b>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className="btn-custom btn-add-to-cart"
                  disabled={art.qtestock <= 1}
                  onClick={() => handleAddToCart(art)}
                  variant="contained"
                  size="small"
                >
                  {art.qtestock <= 1 ? 'OUT OF STOCK' : 'Ajouter'}
                </Button>
                <Button
                  className="btn-custom btn-view-product"
                  onClick={() => handleShowModal(art)}
                  variant="contained"
                  size="small"
                >
                  Voir Produit
                </Button>
              </CardActions>
            </Card>
          ))}
        </Carousel>
        {showModal && (
          <ModalArt
            show={showModal}
            handleClose={handleCloseModal}
            art={article}
            handleAddToCart={handleAddToCart}
          />
        )}
      </div>
    </>
  );
};

export default AfficheArticles;
