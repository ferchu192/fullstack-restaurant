import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShopItem {
  name: string;
  cant: number;
  price: number;
};

interface ShopState {
  products: { [key: string]: ShopItem };
  totalPrice: number;
  totalCount: number;
};

interface ProductPayload {
  id: string;
  name: string;
  price: number;
};

const initialState: ShopState = {
  products: {},
  totalPrice: 0,
  totalCount: 0,
};

const shopReducer = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductPayload>) {
      const { id, name, price } = action.payload;
      if (state.products[id]) {
        state.products[id].cant += 1;
        state.totalPrice += price;
      } else {
        state.products[id] = { name, cant: 1, price };
        state.totalPrice += price;
        state.totalCount += 1
      }
    },
    decrementProduct(state, action: PayloadAction<ProductPayload>) {
      const { id, price } = action.payload;

      if (state.products[id]) {
        state.products[id].cant -= 1;
        state.totalPrice -= price;

        if (state.products[id].cant == 0) {
          state.totalCount -= 1;
          delete state.products[id];
        }
      }
    },
    resetOrder(state) {
      state.products = {};
      state.totalCount = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addProduct, decrementProduct, resetOrder } = shopReducer.actions;

export default shopReducer.reducer;
