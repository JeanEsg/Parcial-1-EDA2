import { createSlice } from "@reduxjs/toolkit";

const estadoInicial = {
  ciudades: {},
  ciudadSeleccionada: null,
};

const ciudadesSlice = createSlice({
  name: "ciudades",
  initialState: estadoInicial,
  reducers: {
    agregarCiudad(state, action) {
      const nombreCiudad = action.payload;
      if (!state.ciudades[nombreCiudad]) {
        state.ciudades[nombreCiudad] = {
          raiz: { nombre: nombreCiudad, subzonas: [] },
        };
        state.ciudadSeleccionada = nombreCiudad;
      }
    },
    eliminarCiudad(state, action) {
      const nombreCiudad = action.payload;
      delete state.ciudades[nombreCiudad];
      if (state.ciudadSeleccionada === nombreCiudad) {
        state.ciudadSeleccionada = Object.keys(state.ciudades)[0] || null;
      }
    },
    seleccionarCiudad(state, action) {
      const nombreCiudad = action.payload;
      if (state.ciudades[nombreCiudad]) {
        state.ciudadSeleccionada = nombreCiudad;
      }
    },
    editarArbolZona(state, action) {
      const { nombreCiudad, nuevoArbol } = action.payload;
      if (state.ciudades[nombreCiudad]) {
        state.ciudades[nombreCiudad] = nuevoArbol;
      }
    },
  },
});

export const {
  agregarCiudad,
  eliminarCiudad,
  seleccionarCiudad,
  editarArbolZona,
} = ciudadesSlice.actions;

export default ciudadesSlice.reducer;
