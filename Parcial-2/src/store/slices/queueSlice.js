import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    consultas: [],
  },
  reducers: {
    enqueue: (state, action) => {
      state.consultas.push(action.payload);
    },
    dequeue: (state) => {
      if (state.consultas.length > 0) {
        state.consultas.pop();
      }
    },
  },
});

export const { enqueue, dequeue } = queueSlice.actions;
export default queueSlice.reducer;
