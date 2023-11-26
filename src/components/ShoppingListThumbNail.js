import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ShoppingListThumbNail.css"
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ShoppingListThumbnail = ( props ) => {
  const [isModalOpen, setModalOpen] = useState(false);
 const [isArchived, setIsArchived] = useState (false);
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
    
    setIsArchived(props.isArchived);
  }, [props.isArchived]);

  const handleArchiveClick = () => {
 
    props.onArchiveList(props.list.id, !props.isArchived);
  };
  return (
    <div className="shopping-list-thumbnail">
      <h2>{props.list.name}</h2>
      <p> {props.list.author}</p>
      
      <Link to={`/shopping-lists/${props.list.id}`}>
        <button>Zobrazit</button>
        </Link>
        { props.user === props.list.author ? (<button onClick={() => handleDeleteClick(props.list.id)}>Smazat</button>) : (null) }
        { props.user === props.list.author ? (<button onClick={handleArchiveClick}>
        {isArchived ? 'Odarchivovat' : 'Archivovat'}
      </button>) : (null) }
        <DeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ShoppingListThumbnail;
