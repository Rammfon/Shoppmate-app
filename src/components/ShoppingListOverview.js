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
  const [showArchived, setShowArchived] = useState(false);
  const [archivedLists, setArchivedLists] = useState([]); // Nový stav pro ukládání archivovaných seznamů
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
    setArchivedLists(archivedLists.filter((list) => list.id !== listId)); // Odstranit ze seznamu archivovaných seznamů
  };
  const handleArchiveList = (listId, isArchived) => {
    const updatedLists = shoppingListy.map((list) =>
      list.id === listId ? { ...list, isArchived } : list
    );
    setShoppingLists(updatedLists);

    // Aktualizovat seznam archivovaných seznamů
    if (isArchived) {
      setArchivedLists([...archivedLists, shoppingListy.find((list) => list.id === listId)]);
    } else {
      setArchivedLists(archivedLists.filter((list) => list.id !== listId));
    }
  };

  const handleToggleShowArchived = () => {
    // Přepnout mezi zobrazením a skrytím archivovaných seznamů
    setShowArchived(!showArchived);
  };

  return (  
    <div className="shopping-list-overview">
      <div>
      <button onClick={handleToggleShowArchived}>
          {showArchived ? 'Skrýt archivované' : 'Zobrazit archivované'}
        </button>
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
        {shoppingListy
        .filter(list => (showArchived ? true : !list.isArchived))
        .map((list) => (  
          <li key={list.id}>
             
              <ShoppingListThumbnail list={list} user={currentUser} onDeleteList={handleDeleteList}  onArchiveList={handleArchiveList}     isArchived={archivedLists.some((archivedList) => archivedList.id === list.id)} />
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default ShoppingListOverview;
