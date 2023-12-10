import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mockup from '../Data/Mockup';
import ShoppingListThumbnail from './ShoppingListThumbNail';
import CreateListModal from './CreateListModal';
import api from "./ApiWrapper"

const ShoppingListOverview = () => {
  const shoppingListsData = mockup.shoppingLists; 
  const [shoppingLists, setShoppingLists] = useState(shoppingListsData);
  const [showArchived, setShowArchived] = useState(false);
  const [archivedLists, setArchivedLists] = useState([]);
  const owners = Array.from(new Set(shoppingListsData.map((list) => list.owner.username)));
  const [currentUser, setCurrentUser] = useState(owners[0]);
  const [lastClickedButton, setLastClickedButton] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        setLoading(true);
        const lists = await api.getShoppingLists();
        setData(lists);
        setShoppingLists(lists);
      } catch (error) {
        setError(error);
        console.error(`Chyba při předávání dat: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingLists();
  }, []);



  
  const handleOwnerChange = (owner) => {
    setCurrentUser(owner);
    setLastClickedButton(owner);
  };



  const handleCreateList = async (newList) => {
    try {
      
      const addedList = await api.addShoppingList(newList);
      console.log('Added List:', addedList);

     
      setShoppingLists((prevLists) => [...prevLists, addedList]);
    } catch (error) {
      
      console.error('Chyba při přidávání seznamu:', error);
    }
  };


  const handleDeleteList = async (listId) => {
    try {
     
      await api.deleteShoppingList(listId);

     
      const updatedLists = shoppingLists.filter((list) => list.id !== listId);
      setShoppingLists(updatedLists);
      setArchivedLists(archivedLists.filter((list) => list.id !== listId));
    } catch (error) {
      console.error(`Chyba při mazání seznamu s ID ${listId}:`, error);
    }
  };

  console.log (shoppingLists)




  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    const detailClick = (shoppingListId) => {
      navigate(`/shopping-lists/${shoppingListId}`);
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleArchiveList = async (listId, isArchived) => {
    try {
    
      await api.archiveShoppingList(listId, isArchived);
  
     
      const updatedLists = shoppingLists.map((list) =>
        list.id === listId ? { ...list, isArchived } : list
      );
      setShoppingLists(updatedLists);
  
      if (isArchived) {
        setArchivedLists([...archivedLists, shoppingLists.find((list) => list.id === listId)]);
      } else {
        setArchivedLists(archivedLists.filter((list) => list.id !== listId));
      }
    } catch (error) {
      console.error(`Chyba při archivaci seznamu s ID ${listId}:`, error);
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

        {owners.map((owner) => (
          <button
            key={owner}
            onClick={() => handleOwnerChange(owner)}
            style={{ backgroundColor: lastClickedButton === owner ? 'lightblue' : 'whitesmoke' }}
          >
            {owner}
          </button>
        ))}
      </div>
      <h1>Všechny nákupní seznamy</h1>
      <CreateListModal onCreateList={handleCreateList} toggleModal={toggleModal} isModalOpen={isModalOpen} user={currentUser} />
      <ul>
      {shoppingLists
  .filter((list) => (showArchived ? true : !list.isArchived))
  .map((list) => {
    console.log(list);
    return (
      <li key={list.id}>
        <ShoppingListThumbnail
          list={list}
          user={currentUser}
          onDeleteList={handleDeleteList}
          onArchiveList={handleArchiveList}
          isArchived={list && list.isArchived}
        />
      </li>
    );
  })}


      </ul>
    </div>
  );
};

export default ShoppingListOverview;
