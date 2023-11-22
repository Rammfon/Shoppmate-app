// ShoppingListOverview.js

import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingListOverview = () => {
  // Assuming you have an array of shopping lists
  const shoppingLists = [
    { id: 1, name: 'Nákupní seznam 1', members: ["Vy", "Uživatel 1", "Uživatel 2", "Uživatel 3"], items: [
        { id: 1, name: "Položka 1", status: "nevyřešená" },
        { id: 2, name: "Položka 2", status: "nevyřešená" },
       
      ], },
    { id: 2, name: 'Nákupní seznam 2', members: ["Vy", "Uživatel 4", "Uživatel 5", "Uživatel 6"], items: [
        { id: 3, name: "Položka 1", status: "nevyřešená" },
        { id: 4, name: "Položka 2", status: "nevyřešená" },
       
      ],},
    // ... add more shopping lists
  ];

  return (
    <div className="shopping-list-overview">
      <h1>Shopping Lists Overview</h1>
      <ul>
        {shoppingLists.map((list) => (  
          <li key={list.id}>
           <Link to={`/api/shopping-lists/${ shoppingLists.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListOverview;
