

import React, { useState } from "react";
import "./CreateListModal.css";

export default function CreateListModal({ onCreateList, toggleModal, isModalOpen, user }) {
  const [listName, setListName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveList = () => {
        
        if (!listName.trim()) {
          setErrorMessage('Nemáte vyplněný název seznamu.');
          return;
        }
    
    
    const newList = {
      id: Date.now(),
      author: user,
      name: listName,
      members: ["Vy"],
      items: [],
    };  

   
    onCreateList(newList);

    
    toggleModal();
    setListName('');
    setErrorMessage('')
  };

  const handleInputChange = (e) => {
   
    setErrorMessage('');
    setListName(e.target.value);
  };
  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Vytvořit nový seznam
      </button>

      {isModalOpen && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Nový seznam</h2>
            <input
              type="text"
              id="listName"
              placeholder="Název seznamu"
              value={listName}
              onChange={handleInputChange}
            />
             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button className="close-modal" onClick={handleSaveList}>
              Uložit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
