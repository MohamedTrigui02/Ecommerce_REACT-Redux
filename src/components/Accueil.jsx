import React, { useEffect, useState } from 'react'
import Menu from './client/Menu'
import CarouselTransition from './client/CarouselTransition'
import Footer from './client/Footer'
import Listearticles from './client/Listearticles'
import AboutUs from './client/AboutUs'
import CarouselPage from './client/carouselArticle/CarouselPage'
import Listearticlespromo from './client/Articlepromo/Listearticlespromo'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Image from './client/Images/Image'







const Accueil = () => {



  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };





  return (
    <div>
           <Menu/>
<CarouselTransition/>

<div id="listeArticles">

<Listearticles/>
</div>




<div id="listeArticlesPromo">

<Listearticlespromo/>
</div>
<Image/>


<div id="carousel">
<CarouselPage/>
</div>
<div id="aboutus">

<AboutUs/>
</div>

<Footer/> 
{showButton && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            cursor: 'pointer'
          }}
          onClick={scrollToTop}
        >
          <KeyboardDoubleArrowUpIcon fontSize="large" />
        </div>
      )}
    </div>
  );
};

export default Accueil;
