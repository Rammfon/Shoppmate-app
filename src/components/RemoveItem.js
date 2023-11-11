import React from "react";

const RemoveItem = ({ item, onRemoveItem }) => {
  const handleRemoveClick = () => {
    onRemoveItem(item);
  };

  return (
    <button className="button" onClick={handleRemoveClick}>Odebrat</button>
  );
};

export default RemoveItem;
