import { configureStore } from "@reduxjs/toolkit";
import queueReducer from "./slices/queueSlice";
import stackReducer from "./slices/stackSlice";

export const store = configureStore({
  reducer: {
    queue: queueReducer,
    stack: stackReducer,
  },
});
