import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../../features/categorieSlice'
import AfficheCategorieTable from './AfficheCategorieTable'
import Insertcategories from './Insertcategories'
import Menu from '../Menu';

const CategoriesAppAdmin = () => {
    const dispatch=useDispatch()
useEffect(()=>{
dispatch(getCategories())
}

,[])


  return (
    <div>
      <Menu/>
      <Insertcategories/>
      <AfficheCategorieTable/>
    </div>
  )
}

export default CategoriesAppAdmin
