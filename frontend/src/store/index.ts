import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './shopReducer';
import restaurantReducer from './restaurantReducer';
import menuReducer from './menuReducer';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    restaurants: restaurantReducer,
    menus: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
