import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./ShoppingListThumbNail.css"
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ShoppingListThumbnail = ( props ) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Volání funkce na smazání seznamu
    props.onDeleteList(props.list.id);
    setModalOpen(false);
    
  };
  return (
    <div className="shopping-list-thumbnail">
      <h2>{props.list.name}</h2>
      <p> {props.list.author}</p>
      
      <Link to={`/shopping-lists/${props.list.id}`}>
        <button>Zobrazit</button>
        </Link>
        { props.user === props.list.author ? (<button onClick={() => handleDeleteClick(props.list.id)}>Smazat</button>) : (null) }
        { props.user === props.list.author ? (<button>Archivovat</button>) : (null) }
        <DeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ShoppingListThumbnail;
