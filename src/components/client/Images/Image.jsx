import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import './Image.css'
const Image = () => {
  // Tableau contenant les URLs des images cloudinary
  const images = [
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1703867019/4eb272f8-6978-4bcb-9168-bf93ea217847_xqpeok.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1703867019/142237a0-dc6e-4972-90de-e0e9041f9a28_ayg229.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1703867018/1068aecb-3743-43ca-ab65-bb6faa46529b_bvtwy9.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1703867017/ec3b8d9f-055c-4159-ae67-ad8903322558_qidwsn.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1703867017/556f1f15-abe9-47e6-8186-c5c1ded13d7f_akn5mw.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1703867013/893aefd0-862d-4c97-8ca6-f27aa504ad27_aefure.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1704144301/images/cendrier-exterieur-sur-pied-cendrier-en-bois-maiso.webp.webp',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1704143906/images/178191_3.webp.webp',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1704143262/images/WhatsApp%20Image%202023-11-27%20at%2020.18.52.jpeg.jpg',
  'https://res.cloudinary.com/de6mllwc6/image/upload/v1704140514/images/WhatsApp%20Image%202023-11-27%20at%2020.19.19.jpeg.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1704140944/images/WhatsApp%20Image%202023-11-27%20at%2020.18.46%20%281%29.jpeg.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1704141564/images/Salle-a-manger-Notte-buffet-DR2-bar-BAR1-T19VM16-6-chaises-noir-K715-elegant-black-ambi-Evan.jpg.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1704145496/images/table-basse-design.jpg.jpg',
    'https://res.cloudinary.com/de6mllwc6/image/upload/v1704144524/images/chambre-adulte-complete-laque-noir-idea.jpeg.jpg',
  ];


  return (
    <div className="conteneur">

    <div className="votre-composant"> 
      <h2 id='galerie'>Notre Gallerie</h2>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((imageUrl, index) => (
          <ImageListItem key={index}>
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              loading="lazy"
              className="image-item"
              style={{ width: '100%', height: 'auto' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
    </div>
  );
};

export default Image;
