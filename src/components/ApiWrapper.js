import mockup from '../Data/Mockup'; 

const mockApi = {
 getShoppingLists: async () => {
   
    return Promise.resolve(mockup.shoppingLists);
  }, 

  ShoppingListById: async (listId) => {
    try {
      const shoppingList = mockup.shoppingLists.find((list) => list.id === listId);

      if (!shoppingList) {
        throw new Error(`Nákupní seznam s ID ${listId} nebyl nalezen`);
      }

      return Promise.resolve(shoppingList);
    } catch (error) {
      return Promise.reject(new Error(`Chyba při zobrazování nákupního seznamu s ${listId}: ${error.message}`));
    }
  },


  
  
  addShoppingList: async (newList) => {
    
    const updatedMockup = { ...mockup, shoppingLists: [...mockup.shoppingLists, newList] };
    return Promise.resolve(newList);
  },
  deleteShoppingList: async (listId) => {
    
    const updatedMockup = {
      ...mockup,
      shoppingLists: mockup.shoppingLists.filter((list) => list.id !== listId),
    };
  

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(`Seznam s ID ${listId} byl vymazán.`);
      }, 500); 
    });
  },
  
  archiveShoppingList: async (listId, isArchived) => {
    
    const updatedMockup = {
      ...mockup,
      shoppingLists: mockup.shoppingLists.map((list) =>
        list.id === listId ? { ...list, isArchived } : list
      ),
    };
    return Promise.resolve();
  },
    

  ShoppingListName: async (listId, newName) => {
    try {
      const updatedMockup = {
        ...mockup,
        shoppingLists: mockup.shoppingLists.map((list) =>
          list.id === listId ? { ...list, name: newName } : list
        ),
      };
      return Promise.resolve(updatedMockup.shoppingLists.find((list) => list.id === listId));
    } catch (error) {
      return Promise.reject(new Error(`Chyba při editaci nákupního seznamu: ${error.message}`));
    }
  },
   

  updateShoppingListMembers: async (listId, updatedMembers) => {
    try {
      const updatedMockup = {
        ...mockup,
        shoppingLists: mockup.shoppingLists.map((list) =>
          list.id === listId ? { ...list, members: updatedMembers } : list
        ),
      };
      return Promise.resolve(updatedMockup.shoppingLists.find((list) => list.id === listId));
    } catch (error) {
      return Promise.reject(new Error(`Chyba při změně počtu členů: ${error.message}`));
    }
  },
  addShoppingListMember: async (listId, newMember) => {
    try {
      const updatedMockup = {
        ...mockup,
        shoppingLists: mockup.shoppingLists.map((list) =>
          list.id === listId ? { ...list, members: [...list.members, newMember] } : list
        ),
      };
      return Promise.resolve(updatedMockup.shoppingLists.find((list) => list.id === listId));
    } catch (error) {
      return Promise.reject(new Error(`Chyba při přidávání nového člena: ${error.message}`));
    }
  },
  
  updateShoppingListItems: async (listId, updatedItems) => {
    try {
      const updatedMockup = {
        ...mockup,
        shoppingLists: mockup.shoppingLists.map((list) =>
          list.id === listId ? { ...list, items: updatedItems } : list
        ),
      };
      return Promise.resolve(updatedMockup.shoppingLists.find((list) => list.id === listId));
    } catch (error) {
      return Promise.reject(new Error(`Chyba při změně stavu položek: ${error.message}`));
    }
  },

  };
  
  // Opravdová serverová implementace
  const realApi = { 
    getShoppingLists: async () => {
     
    },
    ShoppingListById: async (listId) => {

    },
    addShoppingList: async (newList) => {
     
    },
    deleteShoppingList: async (listId) => {

    },
    archiveShoppingList: async (listId, isArchived) => {

    },
    ShoppingListName: async (listId, newName) => {

    },
    updateShoppingListMembers: async (listId, updatedMembers) => {

    },
    addShoppingListMember: async (listId, newMember) => {

    },
    updateShoppingListItems: async (listId, updatedItems) => {

    },

  };
  
 
  const useMock = true; 
  
  const api = useMock ? mockApi : realApi;

  
  
  export default api;
  