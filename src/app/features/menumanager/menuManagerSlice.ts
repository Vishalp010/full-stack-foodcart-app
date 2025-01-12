
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the menu
const initialState = {
  menuItems: [],
};

// Create the slice
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Add a new menu item
    addMenuItem: (state, action) => {
      state.menuItems.push(action.payload); // Adds the new item to the menuItems array
    },
    
    // Update an existing menu item
    updateMenuItem: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.menuItems.findIndex((item) => item.id === id);
      
      if (index !== -1) {
        state.menuItems[index] = { ...state.menuItems[index], ...updatedData };
      }
    },
    
    // Delete a menu item by id
    deleteMenuItem: (state, action) => {
      const idToDelete = action.payload;
      state.menuItems = state.menuItems.filter((item) => item.id !== idToDelete);
    },
  },
});

// Export actions to use in components
export const { addMenuItem, updateMenuItem, deleteMenuItem } = menuSlice.actions;

// Export the reducer to be used in the store
export default menuSlice.reducer;
