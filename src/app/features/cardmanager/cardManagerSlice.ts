import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  card: null, // Store the selected card
};

const selectedCardSlice = createSlice({
  name: 'selectedCard',
  initialState,
  reducers: {
    setCard: (state, action) => {
      state.card = action.payload; // Set the selected card
    }
  },
});

export const { setCard } = selectedCardSlice.actions;
export default selectedCardSlice.reducer;
