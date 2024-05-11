import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getScategories } from '../../../features/ScategorieSlice'
import AfficheScategorieTable from './AfficheScategoriesTable'
import Insertscategories from './Insertscategories'
import Menu from '../Menu';

const ScategoriesAppAdmin = () => {
    const dispatch=useDispatch()
useEffect(()=>{
dispatch(getScategories())
}

,[])


  return (
    <div>
      <Menu/>
        <Insertscategories/>
      <AfficheScategorieTable/>
    </div>
  )
}

export default ScategoriesAppAdmin
