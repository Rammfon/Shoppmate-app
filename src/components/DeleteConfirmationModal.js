import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Opravdu chcete smazat tento seznam?</h2>
        <button onClick={onCancel}>Zrušit</button>
        <button onClick={onConfirm}>Potvrdit smazání</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
