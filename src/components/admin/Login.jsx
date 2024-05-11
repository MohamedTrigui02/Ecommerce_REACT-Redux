import {useState, useEffect} from 'react'
import { useNavigate,Link} from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { login, reset } from "../../features/authSlice"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
AZIIN      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector((state) => state.auth);
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

  const handleSubmit = (event) => {
    
    event.preventDefault();
    const objetuser = {
    email: email,
    password :password
    };
    dispatch(login(objetuser)) ;
    }
    if(isLoggedIn){
    navigate("/admin/menu");
    }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img src="https://res.cloudinary.com/de6mllwc6/image/upload/v1707231848/77_a9altl.png" alt="Avatar" style={{ width: 100, height: 100 }} />
          <Typography component="h1" variant="h5">
CONNEXION          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de Passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>setPassword(event.target.value)}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(event)=>handleSubmit(event)}
            >
CONNEXION            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Vous n'avez pas de compte ? S'inscrire"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}