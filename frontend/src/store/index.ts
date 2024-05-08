import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './shopReducer';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
