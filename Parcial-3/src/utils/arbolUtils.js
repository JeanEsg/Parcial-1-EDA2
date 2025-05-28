export function obtenerAlturaArbol(nodo) {
  if (!nodo) return 0;
  if (!nodo.subzonas || nodo.subzonas.length === 0) return 1;
  const alturas = nodo.subzonas.map(obtenerAlturaArbol);
  return 1 + Math.max(...alturas);
}

export function obtenerTotalZonas(nodo) {
  if (!nodo) return 0;
  if (!nodo.subzonas || nodo.subzonas.length === 0) return 1;
  const totalHijos = nodo.subzonas.reduce(
    (acc, hijo) => acc + obtenerTotalZonas(hijo),
    0,
  );
  return 1 + totalHijos;
}
