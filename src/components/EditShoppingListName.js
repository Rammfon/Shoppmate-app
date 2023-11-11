import React, { useState } from "react";

const EditShoppingListName = ({ currentName, onSave }) => {
  const [newName, setNewName] = useState(currentName);

  const handleSave = () => {
    onSave(newName);
  };

  return (
    <div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Nový název seznamu"
      />
      <button onClick={handleSave}>Uložit</button>
    </div>
  );
};

export default EditShoppingListName;
