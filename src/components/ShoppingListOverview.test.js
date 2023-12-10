import { render, fireEvent, screen } from '@testing-library/react';
import ShoppingListOverview from './ShoppingListOverview';

test('handleAddList adds a new list', async () => {
  // Render the component
  render(<ShoppingListOverview />);

  // Mock the api.addShoppingList function
  jest.spyOn(api, 'addShoppingList').mockResolvedValue({ /* mock data for the new list */ });

  // Trigger the handleAddList function (you may need to wait for async operations)
  fireEvent.click(screen.getByText('Přidat nový nákupní seznam'));

  // Optionally, wait for async operations if needed
  // await screen.findByText('New List Name');

  // Assert that the new list is added to the state or DOM
  // You may need to adjust this based on your actual implementation
  expect(screen.getByText('New List Name')).toBeInTheDocument();
});
