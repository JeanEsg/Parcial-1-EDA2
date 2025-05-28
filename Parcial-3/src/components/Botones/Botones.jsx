import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { agregarCiudad, eliminarCiudad, seleccionarCiudad } from '../../store/ciudadesSlice';
import estilos from './Botones.module.css';

const Botones = () => {
    const ciudades = useSelector((estado) => estado.ciudades.ciudades);
    const ciudadSeleccionada = useSelector((estado) => estado.ciudades.ciudadSeleccionada);
    const dispatch = useDispatch();

    const [nombreNuevaCiudad, setNombreNuevaCiudad] = useState('');

    const manejarAgregarCiudad = () => {
        if (nombreNuevaCiudad.trim() && !ciudades[nombreNuevaCiudad]) {
            dispatch(agregarCiudad(nombreNuevaCiudad.trim()));
            setNombreNuevaCiudad('');
        }
    };

    const manejarEliminarCiudad = () => {
        if (ciudadSeleccionada) {
            dispatch(eliminarCiudad(ciudadSeleccionada));
        }
    };

    const manejarSeleccionarCiudad = (e) => {
        dispatch(seleccionarCiudad(e.target.value));
    };

    return (
        <div className={estilos.botones}>
            <input
                type="text"
                placeholder="Nueva ciudad"
                value={nombreNuevaCiudad}
                onChange={(e) => setNombreNuevaCiudad(e.target.value)}
                className={estilos.entrada}
            />
            <button onClick={manejarAgregarCiudad} className={estilos.boton}>
                Añadir Ciudad
            </button>

            <select
                value={ciudadSeleccionada || ''}
                onChange={manejarSeleccionarCiudad}
                className={estilos.seleccion}
            >
                {Object.keys(ciudades).map((ciudad) => (
                    <option key={ciudad} value={ciudad}>
                        {ciudad}
                    </option>
                ))}
            </select>

            <button onClick={manejarEliminarCiudad} className={estilos.botonEliminar}>
                Eliminar Ciudad
            </button>
        </div>
    );
};

export default Botones;
