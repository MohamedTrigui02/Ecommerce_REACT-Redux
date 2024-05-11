import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScategories } from '../../../features/scategorieSlice';
import { findArticleByscat, getArticles } from '../../../features/articleSlice';
import ArticleCard from './ArticleCard';
import ReactLoading from 'react-loading';
import { FormControl, Select, MenuItem, OutlinedInput } from '@mui/material';

import './ArticlesList.css';
import MenuArt from './MenuArt';

const ArticlesList = () => {
  
  const dispatch = useDispatch();
  const { scategories } = useSelector((state) => state.storescategories);
  const { articles, isLoading, error } = useSelector((state) => state.storearticles);
  const [selectedScategorie, setSelectedScategorie] = useState('');

  useEffect(() => {
    if (scategories.length === 0) {
      dispatch(getArticles());
    }

    dispatch(getScategories());
  }, [dispatch, scategories]);

  const handleScategorieChange = (event) => {
    const selectedScategorieId = event.target.value;
    setSelectedScategorie(selectedScategorieId);

    if (selectedScategorieId === '') {
      dispatch(getArticles());
    } else {
      dispatch(findArticleByscat(selectedScategorieId));
    }
  };

  // Define selectedScategorieObject based on the selectedScategorie value
  const selectedScategorieObject = scategories.find(
    (scategorie) => scategorie._id === selectedScategorie
  );

  return (
    <div>
      <MenuArt/>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={selectedScategorie}
          onChange={handleScategorieChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return 'Toutes les Articles';
            }

            const selectedScategorieObject = scategories.find(
              (scategorie) => scategorie._id === selected
            );
            return selectedScategorieObject ? selectedScategorieObject.nomscategorie : '';
          }}
        >
          <MenuItem value="">
            Toutes les articles
          </MenuItem>
          {scategories.map((scategorie) => (
            <MenuItem key={scategorie._id} value={scategorie._id}>
              {scategorie.nomscategorie}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h2 style={{ textAlign: 'center', fontSize: '24px', color: '#333', marginTop: '20px' }}>
        {selectedScategorie ? `Sous-catégorie sélectionnée: ${selectedScategorieObject.nomscategorie}` : 'Toutes les Articles'}
      </h2>
      
      {isLoading && (
        <center>
          <ReactLoading type='spokes' color="blue" height={'8%'} width={'8%'} />
        </center>
      )}

      {error && <p>Erreur: {error}</p>}

      <div className="article-cards">
        {articles.length > 0 ? (
          articles.map((article) => <ArticleCard key={article._id} article={article} />)
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#555', marginTop: '20px' }}>
            Pas de produits à afficher pour le moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;
