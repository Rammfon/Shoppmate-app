import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

import shoppingLists from '../Data/Mockup';

const Header = () => {
  const location = useLocation();
  const currentUrl = location.pathname


  const excludedUrls = [ "/homepage" ];

 
  const shouldShowButton = !excludedUrls.some((url) => location.pathname.includes(url));
  
  return (
    <div className='header'>
      <div>
      <h1>ShoppMate</h1>
      {shouldShowButton && (
        <Link to={`/`}>
          <button className='home'>Zpět na hlavní stránku</button>
        </Link>
       )}
    
      </div>
    </div>
  );
};

export default Header;
