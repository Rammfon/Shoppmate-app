import React, { useState, useEffect } from "react";
import EditShoppingListName from "./EditShoppingListName";
import LeaveShoppingList from "./LeaveShoppingList";
import RemoveMember from "./RemoveMember";
import AddMember from "./AddMember";
import AddItem from "./AddItem";
import RemoveItem from "./RemoveItem";
import { useParams } from 'react-router-dom';

import LoadingSpinner from './LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';

import api from './ApiWrapper'; 


const ShoppingListDetail = () => {
  const [data, setData] = useState(null);
  const { userId, id } = useParams();
  const [shoppingList, setShoppingList] = useState(null);

  const [viewMode, setViewMode] = useState("vlastník");
  const [isOwner, setIsOwner] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [resolvedItems, setResolvedItems] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("vše");
  const [showFilters, setShowFilters] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const [currentName, setCurrentName] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const list = await api.ShoppingListById(id);
        setShoppingList(list);
        setLoading(false);
      } catch (error) {

        setError(error);
        setLoading(false);
        console.error(`Chyba při předávání dat: ${error.message}`);
      }
    };
  
    fetchShoppingList();
  }, [id]);


  if (loading) {
    return <LoadingSpinner />; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }



const handleEditClick = () => {
  setEditingName(true);
};

const changeName = async (newName) => {
  try {
    await api.ShoppingListName(shoppingList.id, newName);
    
    setShoppingList((prevList) => ({ ...prevList, name: newName }));
    setCurrentName(newName);
    setEditingName(false);
    console.log("Nový název:", newName); 
  } catch (error) {
    console.error(`Chyba při změně jména: ${error.message}`);
  }
};


  

const handleLeave = async () => {
  try {
    if (shoppingList.members.some((member) => member.username === "Vy")) {
      const updatedMembers = shoppingList.members.filter((m) => m.username !== "Vy");
      await api.updateShoppingListMembers(shoppingList.id, updatedMembers);
      setShoppingList({ ...shoppingList, members: updatedMembers });
    }
  } catch (error) {
    console.error(`Chyba při opouštění nákupního seznamu: ${error.message}`);
  }
};

  const handleRemoveMember = async (member) => {
    try {
      const updatedMembers = shoppingList.members.filter((m) => m !== member);
      await api.updateShoppingListMembers(shoppingList.id, updatedMembers);
      setShoppingList({ ...shoppingList, members: updatedMembers });
    } catch (error) {
      console.error(`Chyba při odstraňování člena: ${error.message}`);
    }
  };
  const handleAddMember = async (newMemberName) => {
    try {
      const newMemberId = uuidv4(); 
      const newMember = { id: newMemberId, username: newMemberName, role: 'member' };
  
      const updatedMembers = [...shoppingList.members, newMember];
      await api.updateShoppingListMembers(shoppingList.id, updatedMembers);
  
      setShoppingList({ ...shoppingList, members: updatedMembers });
      setAddingMember(false);
    } catch (error) {
      console.error(`Chyba při přidávání nového člena: ${error.message}`);
    }
  };
  

  const handleAddItem = async (newItemName) => {
    try {
      const newItemId = uuidv4(); 
      const newItem = { itemId: newItemId, itemName: newItemName, resolved: false };
  
      const updatedItems = [...shoppingList.items, newItem];
      await api.updateShoppingListItems(shoppingList.id, updatedItems);
  
      setShoppingList({ ...shoppingList, items: updatedItems });
      setAddingItem(false);
    } catch (error) {
      console.error(`Chyba při přidávání položky: ${error.message}`);
    }
  };
  
  const handleRemoveItem = async (itemId) => {
    try {
      const updatedItems = shoppingList.items.filter((item) => item.itemId !== itemId);
      await api.updateShoppingListItems(shoppingList.id, updatedItems);
  
      setShoppingList({ ...shoppingList, items: updatedItems });
    } catch (error) {
      console.error(`Chyba při odstraňování položky: ${error.message}`);
    }
  };
  const handleResolveItem = async (itemId) => {
    try {
      const updatedItems = shoppingList.items.map((item) =>
        item.itemId === itemId ? { ...item, resolved: !item.resolved } : item
      );
  
      await api.updateShoppingListItems(shoppingList.id, updatedItems);
  
      setShoppingList((prevList) => ({ ...prevList, items: updatedItems }));
    } catch (error) {
      console.error(`Chyba při změně stavu: ${error.message}`);
    }
  };
  
  console.log(shoppingList);

  return (
    <div className="shoppinglistdetail">
      <div>
        <button className="button" onClick={() => setViewMode("vlastník")}>Zobrazit jako vlastník</button>
        <button className="button" onClick={() => setViewMode("člen")}>Zobrazit jako člen</button>
      </div>

      {editingName ? (
        <EditShoppingListName currentName={shoppingList?.name} onSave={changeName} />
      ) : (
        <h1>
          {shoppingList?.name}
          {isOwner && viewMode === "vlastník" && !editingName && (
            <button className="button" onClick={() => handleEditClick()}>Editovat</button>
          )}
          {isOwner && viewMode === "vlastník" && (
            <button className="button" onClick={() => setAddingMember(true)}>Přidat člena</button>
          )}

          {addingMember && isOwner && viewMode === "vlastník" && <AddMember onAddMember={handleAddMember} />}
        </h1>
      )}

      <h2>Členové nákupního seznamu:</h2>
      <ul className="memberlist">
        {shoppingList?.members.map((member, index) => (
          <li key={index} className="memberitem">
            {member.username}

            {member.username === "Vy" && <LeaveShoppingList onLeave={handleLeave} />}
            {isOwner && member.username !== "Vy" && viewMode === "vlastník" && (
              <RemoveMember member={member} onRemove={handleRemoveMember} />
            )}
          </li>
        ))}
      </ul>

      <div>
        <button className="button" onClick={() => setShowFilters(!showFilters)}>Filtry</button>
      </div>

      {showFilters && (
        <div>
          <button className="button" onClick={() => setSelectedStatus("vše")}>Vše</button>
          <button className="button" onClick={() => setSelectedStatus("vyřešená")}>Vyřešené</button>
          <button className="button" onClick={() => setSelectedStatus("nevyřešená")}>Nevyřešené</button>
        </div>
      )}

      <h2>Položky seznamu:</h2>
      <ul>
  {shoppingList?.items
    .filter((item) => selectedStatus === "vše" || item.resolved === (selectedStatus === "vyřešená"))
    .map((item) => (
      <li key={item.itemId} style={{ color: item.resolved ? "green" : "black" }}>
        <span>
          {item.itemName} ({item.resolved ? "vyřešeno" : "nevyřešeno"})
        </span>
        <input
          type="checkbox"
          checked={item.resolved}
          onChange={() => handleResolveItem(item.itemId)}
        />
        {isOwner && (
          <RemoveItem itemId={item.itemId} onRemoveItem={() => handleRemoveItem(item.itemId)} />
        )}
      </li>
    ))}
</ul>

      {isOwner && <button className="button" onClick={() => setAddingItem(true)}>Přidat položku</button>}
      {addingItem && isOwner && <AddItem onAddItem={handleAddItem} />}
    </div>
  );
};

export default ShoppingListDetail;
