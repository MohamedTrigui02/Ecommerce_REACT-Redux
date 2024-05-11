import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCarousel } from '../../../features/carouselSlice'
import AfficheCarouselTable from './AfficheCarouselTable'
import Insertcarousel from './Insertcarousel'
import Menu from '../Menu';

const CarouselAppAdmin = () => {
    const dispatch=useDispatch()
useEffect(()=>{
dispatch(getCarousel())
}

,[])


  return (
    <div>
      <Menu/>
      <Insertcarousel/>
      <AfficheCarouselTable/>
    </div>
  )
}

export default CarouselAppAdmin
