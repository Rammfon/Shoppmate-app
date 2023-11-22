import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
    <h1>ShoppMate</h1>
    <Link to={`/`}>
        <button className='home'>Zpět na hlavní stránku</button>
      </Link>
    </div>
  );
};

export default Header;
