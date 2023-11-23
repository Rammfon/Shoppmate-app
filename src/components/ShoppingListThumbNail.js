import React from 'react';
import { Link } from 'react-router-dom';
import "./ShoppingListThumbNail.css"

const ShoppingListThumbnail = ( props ) => {
  
  return (
    <div className="shopping-list-thumbnail">
      <h2>{props.list.name}</h2>
      <p>Autor: {props.list.author}</p>
      
      <Link to={`/shopping-lists/${props.list.id}`}>
        <button>Zobrazit</button>
        </Link>
        { props.user === props.list.author ? (<button>Smazat</button>) : (null) }
        { props.user === props.list.author ? (<button>Archivovat</button>) : (null) }

    </div>
  );
};

export default ShoppingListThumbnail;
