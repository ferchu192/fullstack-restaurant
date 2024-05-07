import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShopItem {
  name: string;
  cant: number;
};

interface CounterState {
  shop: { [key: string]: ShopItem };
  totalPrice: number;
  totalCount: number;
};

interface ProductPayload {
  id: string;
  name: string;
  price: number;
};

const initialState: CounterState = {
  shop: {},
  totalPrice: 0,
  totalCount: 0,
};

const counterSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductPayload>) {
      const { id, name, price } = action.payload;
      if (state.shop[id]) {
        state.shop[id].cant += 1;
        state.totalPrice += price;
      } else {
        state.shop[id] = { name, cant: 1 };
        state.totalPrice += price;
        state.totalCount += 1
      }
    },
    decrementProduct(state, action: PayloadAction<ProductPayload>) {
      const { id, price } = action.payload;

      if (state.shop[id]) {
        state.shop[id].cant -= 1;
        state.totalPrice -= price;

        if (state.shop[id].cant == 0) {
          state.totalCount -= 1;
          delete state.shop[id];
        }
      }
    },
    // incrementByAmount(state, action: PayloadAction<{ name: string; amount: number }>) {
    //   const { name, amount } = action.payload;
    //   if (state.shop[name]) {
    //     state.shop[name].cant += amount;
    //   } else {
    //     state.shop[name] = { name, cant: amount };
    //   }
    // },
  },
});

export const { addProduct, decrementProduct } = counterSlice.actions;

export default counterSlice.reducer;
