import React from "react";

const RemoveItem = ({ itemId, onRemoveItem }) => {
  const handleRemoveClick = () => {
    onRemoveItem(itemId);
  };

  return (
    <button className="button" onClick={handleRemoveClick}>
      Odebrat
    </button>
  );
};

export default RemoveItem;
