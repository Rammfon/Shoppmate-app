import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const AddItem = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState("");

  const handleAddClick = () => {
    console.log("New Item Name:", newItem);


    if (typeof newItem === 'string' && newItem.trim() !== "") {
      const newItemObject = { itemId: uuidv4(), itemName: newItem.trim(), resolved: "nevyřešená" };
      console.log("New Item Object:", newItemObject);

      onAddItem(newItem);
      setNewItem("");
    } else {
      console.log("Invalid Item Name");
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
      <button className="button" onClick={handleAddClick}>Přidat položku</button>
    </div>
  );
};

export default AddItem;
