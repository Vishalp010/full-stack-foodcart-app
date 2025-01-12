import { configureStore } from "@reduxjs/toolkit";
import selectedCardReducer from "@/app/features/cardmanager/cardManagerSlice";
import cartReducer from "@/app/features/cartmanager/cartManagerSlice"; // Import the new cart slice

export const store = configureStore({
  reducer: {
    selectedCard: selectedCardReducer,
    cart: cartReducer, // Add the cart reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
