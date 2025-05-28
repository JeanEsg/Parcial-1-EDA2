import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editarArbolZona } from '../../store/ciudadesSlice';
import ParquesArbol from '../ParquesArbol/ParquesArbol';
import styles from './CiudadesCard.module.css';
import { obtenerAlturaArbol, obtenerTotalZonas } from '../../utils/arbolUtils';

const CiudadCard = () => {
    const dispatch = useDispatch();
    const ciudadSeleccionada = useSelector((estado) => estado.ciudades.ciudadSeleccionada);
    const arbol = useSelector((estado) => (ciudadSeleccionada ? estado.ciudades.ciudades[ciudadSeleccionada] : null));

    const [nombreNuevaZona, setNombreNuevaZona] = useState('');
    const [rutaZonaPadre, setRutaZonaPadre] = useState([]);

    if (!arbol || !ciudadSeleccionada) return <div className={styles.sinCiudad}>Selecciona una ciudad</div>;

    const buscarNodo = (nodo, ruta) => {
        if (ruta.length === 0) return nodo;
        const [siguienteNombre, ...resto] = ruta;
        const siguienteNodo = nodo.subzonas.find((z) => z.nombre === siguienteNombre);
        if (!siguienteNodo) return null;
        return buscarNodo(siguienteNodo, resto);
    };

    const manejarAgregarZona = () => {
        if (!nombreNuevaZona.trim()) return;

        const nuevoArbol = structuredClone(arbol);
        const nodoPadre = buscarNodo(nuevoArbol.raiz, rutaZonaPadre) || nuevoArbol.raiz;

        if (nodoPadre.subzonas.some((z) => z.nombre === nombreNuevaZona)) {
            alert('Ya existe una subzona con ese nombre en esta zona');
            return;
        }

        nodoPadre.subzonas.push({ nombre: nombreNuevaZona.trim(), subzonas: [] });

        dispatch(editarArbolZona({ nombreCiudad: ciudadSeleccionada, nuevoArbol }));
        setNombreNuevaZona('');
    };

    const obtenerRutasDeZonas = (nodo, ruta = []) => {
        let rutas = [ruta];
        nodo.subzonas.forEach((hijo) => {
            rutas = rutas.concat(obtenerRutasDeZonas(hijo, [...ruta, hijo.nombre]));
        });
        return rutas;
    };

    const rutasZonas = arbol ? obtenerRutasDeZonas(arbol.raiz) : [];

    const altura = arbol ? obtenerAlturaArbol(arbol.raiz) : 0;
    const totalZonas = arbol ? obtenerTotalZonas(arbol.raiz) : 0;

    return (
        <div className={styles.ciudadCard}>
            <h2>Ciudad: {ciudadSeleccionada}</h2>

            <p>
                <strong>Altura máxima de zonas verdes:</strong> {altura}
            </p>
            <p>
                <strong>Total de zonas verdes:</strong> {totalZonas}
            </p>

            <div className={styles.agregarZona}>
                <input
                    type="text"
                    placeholder="Nombre nueva zona verde"
                    value={nombreNuevaZona}
                    onChange={(e) => setNombreNuevaZona(e.target.value)}
                    className={styles.entrada}
                />
                <select
                    value={rutaZonaPadre.join('>') || ''}
                    onChange={(e) => setRutaZonaPadre(e.target.value ? e.target.value.split('>') : [])}
                    className={styles.seleccion}
                >
                    <option value="">Raíz (zona principal)</option>
                    {rutasZonas.map((ruta, i) => {
                        if (ruta.length === 0) return null;
                        return (
                            <option key={i} value={ruta.join('>')}>
                                {ruta.join(' > ')}
                            </option>
                        );
                    })}
                </select>
                <button onClick={manejarAgregarZona} className={styles.boton}>
                    Añadir Zona
                </button>
            </div>

            <div className={styles.contenedorArbol}>
                <ParquesArbol arbol={arbol} />
            </div>
        </div>
    );
};

export default CiudadCard;
