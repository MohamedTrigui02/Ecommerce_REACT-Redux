import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import AfficheAerticlePromoTable from './AfficheAerticlePromoTable';
import Createarticlepromo from './Createarticlepromo';
import { getArticlesPromo } from '../../../features/articlePromoSlice';
import Menu from '../Menu';

const ProductsPromoAppAdmin = () => {
const dispatch = useDispatch();
useEffect(() => {
dispatch(getArticlesPromo());
console.log(getArticlesPromo)
},[])

return (
<div>
    <Menu/>
    <Createarticlepromo/>
<AfficheAerticlePromoTable />
</div>
)
}
export default ProductsPromoAppAdmin