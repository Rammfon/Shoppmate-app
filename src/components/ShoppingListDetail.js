import React, { useState, useEffect } from "react";
import EditShoppingListName from "./EditShoppingListName";
import LeaveShoppingList from "./LeaveShoppingList";
import RemoveMember from "./RemoveMember";
import AddMember from "./AddMember";
import AddItem from "./AddItem";
import RemoveItem from "./RemoveItem";
import { useParams } from 'react-router-dom';
import mockup from '../Data/Mockup';
const ShoppingListDetail = () => {
  
  const { id } = useParams();

  // State to store shopping list data

  const [shoppingList, setShoppingList] = useState (mockup.find(item => item.id === parseInt(id)));

  
  const [viewMode, setViewMode] = useState("vlastník");
  const [isOwner, setIsOwner] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [resolvedItems, setResolvedItems] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("vše");
  const [showFilters, setShowFilters] = useState(false);
  const [addingMember, setAddingMember] = useState(false);

  // Fetch data for the selected shopping list
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with your actual data fetching logic
      try {
        const response = await fetch(`/api/shopping-lists/${id}`);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);;
        }
        const data = await response.json();
        setShoppingList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);





  const changeName = (newName) => {
    setShoppingList({ ...shoppingList, name: newName });
    setEditingName(false);
  };

  const handleEditClick = () => {
    setEditingName(true);
  };

  const handleLeave = () => {
    
    if (shoppingList.members.includes("Vy")) {
      const updatedMembers = shoppingList.members.filter((m) => m !== "Vy");
      setShoppingList({ ...shoppingList, members: updatedMembers });
    }
  };

  const handleRemoveMember = (member) => {
   
    const updatedMember = shoppingList.members.filter((m) => m !== member);

   
    setShoppingList({ ...shoppingList, members: updatedMember });
  };



  const handleAddMember = (newMemberName) => {
   
    const updatedMembers = [...shoppingList.members, newMemberName];
    setShoppingList({ ...shoppingList, members: updatedMembers });
    setAddingMember(false);
  };

  const handleAddItem = (newItemName) => {
  
    const newItem = { id: shoppingList.items.length + 1, name: newItemName, status: "nevyřešená" };
    const updatedItems = [...shoppingList.items, newItem];
    setShoppingList({ ...shoppingList, items: updatedItems });
    setAddingItem(false);
  };

  const handleRemoveItem = (item) => {
   
    const updatedItems = shoppingList.items.filter((i) => i !== item);
    setShoppingList({ ...shoppingList, items: updatedItems });
  };

  const handleResolveItem = (id) => {
    if (resolvedItems.includes(id)) {
      setResolvedItems(resolvedItems.filter((i) => i !== id));
    } else {
      setResolvedItems([...resolvedItems, id]);
    }
  };

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
            {member}
           
            {member === "Vy" && <LeaveShoppingList  onLeave={handleLeave} />}
            {isOwner && member !== "Vy" && viewMode === "vlastník" && (
             
          
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
          .filter((item) => {
            return (
              selectedStatus === "vše" ||
              (selectedStatus === "vyřešená" && resolvedItems.includes(item.id)) ||
              (selectedStatus === "nevyřešená" && !resolvedItems.includes(item.id))
            );
          })
          .map((item) => (
            <li key={item.id} style={{ color: resolvedItems.includes(item.id) ? "green" : "black" }}>
              <span>{item.name} ({resolvedItems.includes(item.id) ? "vyřešeno" : "nevyřešeno"})</span>
              <input
                type="checkbox"
                checked={resolvedItems.includes(item.id)}
                onChange={() => handleResolveItem(item.id)}
              />
              {isOwner && <RemoveItem item={item} onRemoveItem={() => handleRemoveItem(item)} />}
            </li>
          ))}
      </ul>

      {isOwner && <button className="button" onClick={() => setAddingItem(true)}>Přidat položku</button>}
      {addingItem && isOwner && <AddItem onAddItem={handleAddItem} />}
    </div>
  );
};

export default ShoppingListDetail;
