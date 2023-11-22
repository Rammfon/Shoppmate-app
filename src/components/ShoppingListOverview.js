// ShoppingListOverview.js

import React from 'react';
import { useState } from 'react';
import { Link, useNavigate,} from 'react-router-dom';
import mockup from '../Data/Mockup';
import ShoppingListThumbnail from './ShoppingListThumbNail';
import CreateListModal from './CreateListModal';

const ShoppingListOverview = () => {
  const shoppingLists = mockup;
  const [shoppingListy, setShoppingLists] = useState(shoppingLists);

  const handleCreateList = (newList) => {
    // Zpracujte vytvoření nového seznamu a aktualizujte stav seznamů
    setShoppingLists([...shoppingListy, newList]);
  };
    
    
   
    const navigate = useNavigate();
   

 
    const [isModalOpen, setModalOpen] = useState(false);
    
  
      const toggleModal = () => {
        setModalOpen(!isModalOpen);
        const detailClick = (shoppingListId) => {
          navigate(`/shopping-lists/${shoppingListId}`);
      };
  
  };
  return (  
    <div className="shopping-list-overview">
      <h1>Všechny nákupní seznamy</h1>
      <CreateListModal onCreateList={handleCreateList} toggleModal={toggleModal} isModalOpen={isModalOpen}/>
      <ul>
        {shoppingListy.map((list) => (  
          <li key={list.id}>
             <ShoppingListThumbnail list={list} />
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default ShoppingListOverview;
