import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import AfficheArticlesPromo from './AfficheArticlesPromo';
import { getArticlesPromo } from '../../../features/articlePromoSlice';

const Listearticlespromo = () => {
    const dispatch=useDispatch()// vous utilisez dispatch pour envoyer cette action au store. Cela informe le store que quelque chose s'est produit dans votre application et que l'état doit être mis à jour en conséquence. 
    useEffect(()=>{
        dispatch(getArticlesPromo())
    },[dispatch])
  return (
    <div>

<AfficheArticlesPromo/>  
  </div>
  )
}

export default Listearticlespromo
