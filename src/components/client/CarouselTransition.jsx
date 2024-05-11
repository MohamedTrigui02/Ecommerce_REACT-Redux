import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarousel } from '../../features/carouselSlice';
import './CarouselTransition.css'
function CarouselTransition() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch l'action pour récupérer les images depuis le store Redux
    dispatch(getCarousel());
  }, [dispatch]);

  // Récupère les images depuis le store Redux
  const images = useSelector(state => state.storecarousel.carousels);

  return (
    <>
      <Carousel fade>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={image.imagecarousel}
              className="d-block w-100 custom-image"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselTransition;
