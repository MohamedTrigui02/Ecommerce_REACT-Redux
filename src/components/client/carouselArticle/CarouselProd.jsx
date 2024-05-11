import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ModalArt from '../ModalArt';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getTotals } from '../../../features/cartSlice';
const responsive = {
desktop: {
breakpoint: { max: 3000, min: 1024 },
items: 6,
slidesToSlide: 3 // optional, default to 1.

},
tablet: {
breakpoint: { max: 1024, min: 464 },
items: 3,
slidesToSlide: 2 // optional, default to 1.
},
mobile: {
breakpoint: { max: 464, min: 0 },
items: 2,
slidesToSlide: 1 // optional, default to 1.
}
};
export default function RLCarousel({ selectedSCategory }) {
const { articles } = useSelector((state) => state.storearticles);
const dispatch = useDispatch();

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


return (
    <>
      <Carousel responsive={responsive}>
      {articles
  .filter((article) =>
    selectedSCategory
      ? article.scategorieID?._id === selectedSCategory._id
      : true
  )
  .map((element) => (
    <div key={element?._id} onClick={() => handleShowModal(element)}>
      {element && (
        <>
          <img
            draggable={false}
            style={{ width: '200px', height: '150px' }}
            src={element.imageart}
            alt={element.designation}
          />
          <div>{element.designation}</div>
          <div>{element.prix} TND</div>
        </>
      )}
    </div>
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
    </>
  );
}
