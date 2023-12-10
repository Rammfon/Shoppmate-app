import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ShoppingListThumbNail.css";
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ShoppingListThumbnail = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    props.onDeleteList(props.list.id);
    setModalOpen(false);
  };

  useEffect(() => {
    setIsArchived(props.list.isArchived);
  }, [props.list.isArchived]);

  const handleArchiveClick = () => {
    props.onArchiveList(props.list.id, !props.list.isArchived);
  };

  return (
    <div className="shopping-list-thumbnail">
      <h2>{props.list.name}</h2>
      {props.list.owner && props.list.owner.username ? (
        <p>Created by: {props.list.owner.username}</p>
      ) : null}

      <Link to={`/shopping-lists/${props.list.id}`}>
        <button>Zobrazit</button>
      </Link>

      {props.user === props.list.owner?.username ? (
        <button onClick={() => handleDeleteClick(props.list.id)}>Smazat</button>
      ) : null}

      {props.user === props.list.owner?.username ? (
        <button onClick={handleArchiveClick}>
          {isArchived ? 'Odarchivovat' : 'Archivovat'}
        </button>
      ) : null}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ShoppingListThumbnail;
