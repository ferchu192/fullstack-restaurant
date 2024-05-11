import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
import { Restaurant } from '../pages/home/Restaurant';

interface ShopState {
  restaurants: Restaurant[];
};

interface RestaurantPayload {
  newRestaurants: Restaurant[];
};

const initialState: ShopState = {
  restaurants: [],
};

const restaurantReducer = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    addNewRestaurants(state, action: PayloadAction<RestaurantPayload>) {
      const { newRestaurants } = action.payload;
      state.restaurants = [...state.restaurants, ...newRestaurants];
    },
  },
});

export const { addNewRestaurants } = restaurantReducer.actions;

export default restaurantReducer.reducer;
