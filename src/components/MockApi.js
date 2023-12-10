import mockup from '../Data/Mockup'; 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const mockApi = {


 getShoppingLists: async () => {
  
  return Promise.resolve(mockup.shoppingLists);
},

 addShoppingList: async ( listId, newList) => {
 
  const updatedMockup = { ...mockup, shoppingLists: [...mockup.shoppingLists, newList] };
  return Promise.resolve(newList);
},

 deleteShoppingList: async (listId) => {
  const updatedMockup = {
    ...mockup,
    shoppingLists: mockup.shoppingLists.filter((list) => list.id !== listId),
  };
  return Promise.resolve({ success: true });
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

}
export default mockApi;