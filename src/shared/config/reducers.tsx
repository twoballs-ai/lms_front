import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // начальное состояние
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    // другие action creators могут быть добавлены здесь
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;