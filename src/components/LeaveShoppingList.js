import React from "react";


const LeaveShoppingList = ({ onLeave }) => {
  const handleLeave = () => {
    onLeave(); 
  };

  return (
    <button className="button" onClick={handleLeave}>Odejít ze seznamu</button>
  );
};

export default LeaveShoppingList