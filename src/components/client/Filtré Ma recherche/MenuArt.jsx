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
import './MenuArt.css'; // Import du fichier CSS

const MenuArt = () => {
  const navigate = useNavigate();
  const { cartTotalQuantity } = useSelector((state) => state.storecart);







  return (
    <>
      <Navbar bg="dark" variant="dark">
      <IconButton
              className="AddCircleIcon" 
              size="small"
              edge="end"
              aria-label="add"
              aria-haspopup="true"
              color="warning"
              onClick={() => {
                navigate('/login');
              }}
            >
            <b>s'Authentifier</b>   <AddCircleIcon sx={{ fontSize: 20 }} />
            </IconButton>

        <Container className="navbar-container">
        <Navbar.Brand href="/"  style={{ fontSize: '20px', margin: '0 10px', transition: 'font-size 0.3s ease-in-out' }}>
           Accueil
          </Navbar.Brand>

        <Navbar.Brand href="/"style={{ fontSize: '30px',color:'gold', margin: '0 10px', transition: 'font-size 0.3s ease-in-out' }}>Bey WoodArt</Navbar.Brand>
        </Container>
        <div className='btcrt'>          <IconButton
              className="cartButton" 
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
         

</div >
        <IconButton
              className="logoutButton" 
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

export default MenuArt;
