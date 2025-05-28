import { configureStore } from "@reduxjs/toolkit";
import ciudadesReducer from "./ciudadesSlice";

export const store = configureStore({
  reducer: {
    ciudades: ciudadesReducer,
  },
});
