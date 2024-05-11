import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import {getArticles} from "../../features/articleSlice";
import AfficheArticles from './AfficheArticles';
import './AfficheArticles.css';

const Listearticles = () => {
    const dispatch=useDispatch()// vous utilisez dispatch pour envoyer cette action au store. Cela informe le store que quelque chose s'est produit dans votre application et que l'état doit être mis à jour en conséquence. 
    useEffect(()=>{
        dispatch(getArticles())
    },[dispatch])
  return (
    <div>

<AfficheArticles/>  
  </div>
  )
}

export default Listearticles
