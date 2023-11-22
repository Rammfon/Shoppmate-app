// CreateListModal.js

import React, { useState } from "react";
import "./CreateListModal.css";

export default function CreateListModal({ onCreateList, toggleModal, isModalOpen }) {
  const [listName, setListName] = useState('');

  const handleSaveList = () => {
    // Vytvořte nový seznam
    const newList = {
      id: Date.now(),
      name: listName,
      members: ["Vy"],
      items: [],
    };  

    // Zavolejte funkci na vytvoření seznamu, kterou jste předali jako prop
    onCreateList(newList);

    // Zavřete modální okno
    toggleModal();
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
              onChange={(e) => setListName(e.target.value)}
            />
            <button className="close-modal" onClick={handleSaveList}>
              Uložit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
