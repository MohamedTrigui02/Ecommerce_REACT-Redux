import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
 import './AfficheArticles.css';
import { addToCart, getTotals } from '../../../features/cartSlice';
import ModalArtPromo from './ModalArtPromo';
import { MdOutlineDiscount } from "react-icons/md";

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

const AfficheArticlesPromo = () => {
  const { articlespromo } = useSelector((state) => state.storearticlespromo);
  const dispatch = useDispatch();
  const [autoPlay, setAutoPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [articlePromo, setArticlePromo] = useState(null); // Changement de nom de l'état

  const handleCloseModal = () => {
    setShowModal(false);
    setArticlePromo(null);
  };

  const handleShowModal = (artp) => {
    setArticlePromo(artp); // Correction ici
    setShowModal(true);
  };

  const handleAddToCart = (artp) => {
    dispatch(addToCart(artp));
    dispatch(getTotals());
  };

  const carouselOptions = {
    itemClass: 'image-item',
    responsive: responsive,
    autoPlay: autoPlay,
    autoPlaySpeed: 3000,
    afterChange: (previousSlide, nextSlide) => {
      if ( nextSlide === articlespromo.length - 1) {
        setAutoPlay(false);
      }
    },
  };

  return (
    <div >
      <div className="text-container">
        <p id="textToShowHide" className="hidden">NOS PROMOTIONS EXCULSIVES</p>
      </div>

      <div className="carousel-container" style={{ backgroundColor: '#1E90FF', padding: '1.5px' }}>
        <Carousel {...carouselOptions}>
         { articlespromo.map((artp) => ( // Vérification si articlespromo est un tableau
            <Card key={artp._id} className="carde">
              <CardMedia
                component="img"
                height="160"
                image={artp.imageart}
                alt="Product Image"
                onClick={() => handleShowModal(artp)}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {artp.reference}
                </Typography>
                <Typography variant="body2" fontSize={16} color="#00008B">
                  <b> Prix : <strike> {artp.newprix} DT</strike></b>
                </Typography>

                <Typography variant="body2" fontSize={15} color="red">
                 Prix aprés Promotion : <div className='price' ><b>{artp.prix} DT</b><MdOutlineDiscount />
</div>
                </Typography>


              </CardContent>
              <CardActions>
                <Button
                  className="btn-custom btn-add-to-cart"
                  disabled={artp.qtestock <= 1}
                  onClick={() => handleAddToCart(artp)}
                  variant="contained"
                  size="small"
                >
                  {artp.qtestock <= 1 ? 'OUT OF STOCK' : 'Ajouter'}
                </Button>
                <Button
                  className="btn-custom btn-view-product"
                  onClick={() => handleShowModal(artp)}
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
          <ModalArtPromo
            show={showModal}
            handleClose={handleCloseModal}
            artp={articlePromo}
            handleAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default AfficheArticlesPromo;
