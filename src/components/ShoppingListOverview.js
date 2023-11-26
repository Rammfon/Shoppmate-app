

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
  const [archivedLists, setArchivedLists] = useState([]); 
  const handleCreateList = (newList) => {
  
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
    
    const updatedLists = shoppingListy.filter((list) => list.id !== listId);
   
    setShoppingLists(updatedLists);
    setArchivedLists(archivedLists.filter((list) => list.id !== listId)); 
  };
  const handleArchiveList = (listId, isArchived) => {
    const updatedLists = shoppingListy.map((list) =>
      list.id === listId ? { ...list, isArchived } : list
    );
    setShoppingLists(updatedLists);

   
    if (isArchived) {
      setArchivedLists([...archivedLists, shoppingListy.find((list) => list.id === listId)]);
    } else {
      setArchivedLists(archivedLists.filter((list) => list.id !== listId));
    }
  };

  const handleToggleShowArchived = () => {
    
    setShowArchived(!showArchived);
  };

  return (  
    <div className="shopping-list-overview">
      <div>
      <button onClick={handleToggleShowArchived}>
          {showArchived ? 'Skrýt archivované' : 'Zobrazit archivované'}
        </button>
        
        {authors.map(author => (
          <button key={author} onClick={() => handleAuthorChange(author)}
          style={{ backgroundColor: lastClickedButton === author ? 'lightblue' : 'whitesmoke' }}
          >
            {author}
          </button>
        ))}
      </div>
      <h1>Všechny nákupní seznamy</h1>
      <CreateListModal 
      onCreateList={handleCreateList} 
      toggleModal={toggleModal} 
      isModalOpen={isModalOpen} 
      user = {currentUser} />
      <ul>
        {shoppingListy
        .filter(list => (showArchived ? true : !list.isArchived))
        .map((list) => (  
          <li key={list.id}>
             
              <ShoppingListThumbnail 
              list={list} 
              user={currentUser} 
              onDeleteList={handleDeleteList}  
              onArchiveList={handleArchiveList}     
              isArchived={archivedLists.some((archivedList) => archivedList.id === list.id)} />
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default ShoppingListOverview;
