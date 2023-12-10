


const shoppingLists =  {
    users: [
      { id: 'user1', username: 'ownerUser', role: 'owner' },
      { id: 'user2', username: 'memberUser', role: 'member' },
      { id: 'user3', username: 'Karel', role: 'member' }
    
    ],
    shoppingLists: [
      {
        id: '1',
        name: 'Nákup na víkend',
        members: [{ id: 'user1', username: 'ownerUser' }, { id: 'user2', username: 'memberUser' }],
        owner: { id: 'user1', username: 'ownerUser' },
        isArchived: false,
        items: [
          { itemId: 'item1', itemName: 'pečivo', resolved: false },
          { itemId: 'item2', itemName: 'mléko', resolved: false },
          { itemId: 'item3', itemName: 'kukuřice', resolved: false }
        ]
      },
      {
        id: '2',
        name: 'Vánoční nákupy',
        members: [{ id: 'user1', username: 'ownerUser' }, { id: 'user2', username: 'memberUser' }, { id: 'user3', username: 'Karel' }],
        owner: { id: 'user3', username: 'Karel' },
        isArchived: false,
        items: [
          { itemId: 'item4', itemName: 'puzzle', resolved: false },
          { itemId: 'item5', itemName: 'mikina', resolved: false },
          { itemId: 'item6', itemName: 'špunty do uší', resolved: false }
        ]
      },
      
    ],
    
  };
  
  
  export default shoppingLists