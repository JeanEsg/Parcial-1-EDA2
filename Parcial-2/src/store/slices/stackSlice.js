import { createSlice } from "@reduxjs/toolkit";

const stackSlice = createSlice({
  name: "stack",
  initialState: {
    reclamos: [],
  },
  reducers: {
    push: (state, action) => {
      state.reclamos.push(action.payload);
    },
  },
});

export const { push, pop, clearStack } = stackSlice.actions;
export default stackSlice.reducer;
