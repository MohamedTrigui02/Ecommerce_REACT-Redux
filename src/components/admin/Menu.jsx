import { IconButton } from '@mui/material';
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
const Menu = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">WooDArt <i className="fa-solid fa-shop"></i></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link}to="/categoriesadmin" >CATEGORIES</Nav.Link>
                            <Nav.Link  as={Link}to="/scategoriesadmin">Sous-CATEGORIES</Nav.Link>
                            <Nav.Link  as={Link}to="/articlesadmin">Gérer-ARTICLES</Nav.Link>
                            <Nav.Link  as={Link}to="/articlespromoadmin">Gérer-ARTICLES-En-Promotion</Nav.Link>
                            <Nav.Link  as={Link}to="/carousel">Gérer-Photos-Carousel</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

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


                </Container>
            </Navbar>


        </div>
    )
}
export default Menu
