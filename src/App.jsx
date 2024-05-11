import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';
import './App.css';
import Cart from './components/client/Cart';
import ProductsAppAdmin from './components/admin/articles/ProductsAppAdmin';
import { ToastContainer } from 'react-toastify';
import StripePayment from './components/client/StripePayment';
import CategoriesAppAdmin from './components/admin/categories/CategoriesAppAdmin';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Login from './components/admin/Login';
import Menu from './components/admin/Menu';
import Register from './components/admin/Register';
import Logout from './components/admin/Logout';
import ProtectedRoutes from "./components/ProtectedRoutes";
import Accueil from './components/Accueil';
import { Box } from '@mui/material';
import { Email, Phone, PhonelinkLockOutlined } from '@mui/icons-material';
import DetailArticle from './components/client/DetailArticle';
import ProductsPromoAppAdmin from './components/admin/articlesPromo/ProductsPromoAppAdmin';
import CarouselAppAdmin from './components/admin/carousel/CarouselAppAdmin.jsx';
import ScategoriesAppAdmin from './components/admin/scategories/ScategoriesAppAdmin.jsx';
import ArticlesList from './components/client/Filtré Ma recherche/ArticlesList.jsx';

function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    
    <>
          <ThemeProvider theme={theme}>



        <CssBaseline />
        <ToastContainer />

        <Router>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>

            <Box>
              <Phone/>
              <b>+216-53 630 656</b>
            </Box>
            <Box>
              <Email/>
<b> benbeywood@gmail.com</b>       
 </Box>
          </Box>


          <Routes>


          
          <Route path='/ArticlesList' element={<ArticlesList />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/' element={<Accueil />} />
          <Route path='/detail/:id' element={<DetailArticle />} />

          <Route element={<ProtectedRoutes/>}>
          <Route path='/admin/menu' element={<Menu/>} />

          <Route path='/logout' element={<Logout/>} />
            <Route path='/pay/:total' element={<StripePayment />} />
            <Route path='/articlesadmin' element={<ProductsAppAdmin />} />
            <Route path='/articlespromoadmin' element={<ProductsPromoAppAdmin />} />
            <Route path='/carousel' element={<CarouselAppAdmin />} />

            <Route path='/categoriesadmin' element={<CategoriesAppAdmin />} />
            <Route path='/scategoriesadmin' element={<ScategoriesAppAdmin />} />
            <Route path='/cart' element={<Cart />} />
</Route>

<Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App;
