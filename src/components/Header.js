import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import ShoppingListManagement from './ShoppingListManagement';
import shoppingLists from '../Data/Mockup';

const Header = () => {
  const location = useLocation();
  const currentUrl = location.pathname

  // Definujte seznam URL, na kterých nechcete zobrazit tlačítko
  const excludedUrls = [ "/homepage" ];

  // Zjistěte, zda je aktuální URL v seznamu vyloučených URL
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
