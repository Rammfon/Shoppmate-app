// ShoppingListOverview.js

import React from 'react';
import { useState } from 'react';
import { Link, useNavigate,} from 'react-router-dom';
import mockup from '../Data/Mockup';
import ShoppingListThumbnail from './ShoppingListThumbNail';
import CreateListModal from './CreateListModal';

const ShoppingListOverview = () => {
  
  const shoppingLists = mockup
  const [shoppingListy, setShoppingLists] = useState(shoppingLists);

  const handleCreateList = (newList) => {
    // Zpracujte vytvoření nového seznamu a aktualizujte stav seznamů
    setShoppingLists([...shoppingListy, newList]);
  };
    
  const authors = Array.from(new Set(shoppingLists.map(list => list.author)));
  const [currentUser, setCurrentUser] = useState(authors[0]);
  const [lastClickedButton, setLastClickedButton] = useState(null);

  const handleAuthorChange = (author) => {
    setCurrentUser(author);
    setLastClickedButton(author)
  };
   
    const navigate = useNavigate();
  
    const [isModalOpen, setModalOpen] = useState(false);
  
      const toggleModal = () => {
        setModalOpen(!isModalOpen);
        const detailClick = (shoppingListId) => {
          navigate(`/shopping-lists/${shoppingListId}`);
      };
  
  };

  const handleDeleteList = (listId) => {
    // Filter out the list with the specified ID
    const updatedLists = shoppingListy.filter((list) => list.id !== listId);
    // Update the state with the new list of shopping lists
    setShoppingLists(updatedLists);
  };


  return (  
    <div className="shopping-list-overview">
      <div>
        {/* Tlačítka pro změnu aktuálního uživatele */}
        {authors.map(author => (
          <button key={author} onClick={() => handleAuthorChange(author)}
          style={{ backgroundColor: lastClickedButton === author ? 'lightblue' : 'whitesmoke' }}
          >
            {author}
          </button>
        ))}
      </div>
      <h1>Všechny nákupní seznamy</h1>
      <CreateListModal onCreateList={handleCreateList} toggleModal={toggleModal} isModalOpen={isModalOpen} user = {currentUser} />
      <ul>
        {shoppingListy.map((list) => (  
          <li key={list.id}>
             
              <ShoppingListThumbnail list={list} user={currentUser} onDeleteList={handleDeleteList}  />
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default ShoppingListOverview;
