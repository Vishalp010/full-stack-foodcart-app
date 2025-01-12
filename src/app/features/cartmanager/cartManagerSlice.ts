import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  carts: [], // This will track the cart items
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = {
        id: nanoid(),
        strMeal: action.payload.strMeal,
        strMealThumb: action.payload.strMealThumb,
        idMeal: action.payload.idMeal,
        price: action.payload.price,
        quantity: action.payload.quantity,
        totalPrice: action.payload.totalPrice,
      };
      state.carts.push(item); // Add the item to the cart
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
