import React, { useState } from "react";

const AddMember = ({ onAddMember }) => {
  const [newMember, setNewMember] = useState("");

  const handleAddClick = () => {
    if (newMember.trim() !== "") {
      onAddMember(newMember);
      setNewMember("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Jméno nového člena"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
      />
      <button className="button" onClick={handleAddClick}>Přidat</button>
    </div>
  );
};

export default AddMember;
