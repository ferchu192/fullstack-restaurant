import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
import { Menu } from '../pages/menu/Menu';

interface ShopState {
  menus: Menu[];
};

interface MenuPayload {
  newMenus: Menu[];
};

const initialState: ShopState = {
  menus: [],
};

const menuReducer = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    addNewMenu(state, action: PayloadAction<MenuPayload>) {
      const { newMenus } = action.payload;
      state.menus = [...state.menus, ...newMenus];
    },
  },
});

export const { addNewMenu } = menuReducer.actions;

export default menuReducer.reducer;
