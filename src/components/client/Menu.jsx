import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Menu.css'; // Import du fichier CSS

const Menu = () => {
  const navigate = useNavigate();
  const { cartTotalQuantity } = useSelector((state) => state.storecart);



  const scrollToPromotions = () => {
    const listeArticlesPromo = document.getElementById('listeArticlesPromo');
    if (listeArticlesPromo) {
      listeArticlesPromo.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const scrolltolisteArticlesPromo = () => {
    const listeArticles = document.getElementById('listeArticles');
    if (listeArticles) {
      listeArticles.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const scrollTocarousel = () => {
    const carousel = document.getElementById('carousel');
    if (carousel) {
      carousel.scrollIntoView({ behavior: 'smooth' });
    }
  };


    const scrollToAboutus = () => {
    const aboutus = document.getElementById('aboutus');
    if (aboutus) {
      aboutus.scrollIntoView({ behavior: 'smooth' });
    }
  };




  return (
    <>
      <Navbar bg="dark" variant="dark">
      <IconButton
              className="AddCircleIcon" // Classe pour l'icône de s'inscrire
              size="small"
              edge="end"
              aria-label="add"
              aria-haspopup="true"
              color="warning"
              onClick={() => {
                navigate('/register');
              }}
            >
            <b>s'inscrire</b>   <AddCircleIcon sx={{ fontSize: 20 }} />
            </IconButton>

        <Container className="navbar-container">
          <Navbar.Brand href="/"style={{ fontSize: '30px', margin: '0 10px', transition: 'font-size 0.3s ease-in-out' }}>Bey WoodArt</Navbar.Brand>
          <Navbar.Brand href="/ArticlesList" onClick={scrolltolisteArticlesPromo} style={{ fontSize: '14px', margin: '0 10px', transition: 'font-size 0.3s ease-in-out' }}>
            Nos Articles
          </Navbar.Brand>

          <Navbar.Brand href="#listeArticlesPromo" onClick={scrollToPromotions} style={{ fontSize: '14px', margin: '0 10px', transition: 'font-size 0.3s ease-in-out' }}>
           Nos Promotions
          </Navbar.Brand>


          <Navbar.Brand href="#carousel" onClick={scrollTocarousel} style={{ fontSize: '14px', margin: '0 10px', transition: 'font-size 0.3s ease-in-out' }}>
            Filtré La recherche
          </Navbar.Brand>

          <Navbar.Brand href="#aboutus" onClick={scrollToAboutus} style={{ fontSize: '14px', margin: '0 10px', transition: 'font-size 0.3s ease-in-out' }}>
            A propos de nous ?
          </Navbar.Brand>

          <div>
            <IconButton
              className="cartButton" // Classe pour l'icône du panier
              size="large"
              edge="end"
              aria-label="cart"
              aria-haspopup="true"
              color="success"
              onClick={() => {
                navigate('/cart');
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 40 }} />
              <Badge badgeContent={cartTotalQuantity > 0 ? cartTotalQuantity : 0} color="success" />
            </IconButton>


          </div>
        </Container>
        <IconButton
              className="logoutButton" // Classe pour l'icône de déconnexion
              size="small"
              edge="end"
              aria-label="logout"
              aria-haspopup="true"
              color="error"
              onClick={() => {
                navigate('/logout');
              }}
            >
              <LogoutIcon sx={{ fontSize: 40 }} />
            </IconButton>

      </Navbar>
    </>
  );
};

export default Menu;
