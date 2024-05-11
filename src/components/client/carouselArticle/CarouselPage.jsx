import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { getArticles } from '../../../features/articleSlice';
import { getScategories } from '../../../features/scategorieSlice';
import { getCategories } from '../../../features/categorieSlice';
import CarouselProd from './CarouselProd';
import CarouselSCateg from './CarouselSCategories';
import CarouselCateg from './CarouselCateg';
import './CarouselPage.css';
const CarouselPage = () => {
  const dispatch = useDispatch();
  const [Categ, setCateg] = useState();
  const [SCateg, setSCateg] = useState();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getScategories());
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div className="carousel-page-container"> {/* Utilisation de la classe CSS pour le conteneur */}
      <h4 className="categories-title">Catégories</h4> {/* Utilisation de la classe CSS pour le titre */}
      <Suspense fallback={<div className="loading-text">Loading</div>}>
        <CarouselCateg setCateg={setCateg} />
      </Suspense>
      <h4 className="subcategories-titlee">Sous Catégories : &emsp;<b>{Categ ? Categ.nomcategorie : null}</b></h4>
      <Suspense fallback={<div className="loading-text">Loading</div>}>
        <CarouselSCateg setSCateg={setSCateg} selectedCategory={Categ} />
      </Suspense>
      <h4 className="products-titlee">Produits : &emsp; <b>{SCateg ? SCateg.nomscategorie : null}</b></h4>
      <Suspense fallback={<div className="loading-text">Loading</div>}>
        <CarouselProd selectedSCategory={SCateg} />
      </Suspense>
    </div>
  );
};

export default CarouselPage;
