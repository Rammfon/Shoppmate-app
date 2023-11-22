import React from 'react';
import { Link } from 'react-router-dom';
import "./ShoppingListThumbNail.css"

const ShoppingListThumbnail = ({ list }) => {
  return (
    <div className="shopping-list-thumbnail">
      <h2>{list.name}</h2>
      
      <Link to={`/shopping-lists/${list.id}`}>
        <button>Zobrazit</button>
      </Link>
    </div>
  );
};

export default ShoppingListThumbnail;
