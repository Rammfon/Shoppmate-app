import React, { useState } from "react";

const AddItem = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState("");

  const handleAddClick = () => {
    if (newItem.trim() !== "") {
      onAddItem(newItem);
      setNewItem("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Název nové položky"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button  className="button" onClick={handleAddClick}>Přidat položku</button>
    </div>
  );
};

export default AddItem;
