import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { enqueue } from "./store/slices/queueSlice";
import { push } from "./store/slices/stackSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.queue.consultas);
  const stack = useSelector((state) => state.stack.reclamos);

  const [client, setClient] = useState("");
  const [inputConsultas, setInputConsultas] = useState("");
  const [inputReclamos, setInputReclamos] = useState("");

  const handleSubmitConsulta = (e) => {
    e.preventDefault();
    if (client.trim() && inputConsultas.trim()) {
      dispatch(enqueue({ nombre: client.trim(), mensaje: inputConsultas.trim() }));
      setInputConsultas("");
    }
  };

  const handleSubmitReclamo = (e) => {
    e.preventDefault();
    if (client.trim() && inputReclamos.trim()) {
      dispatch(push({ nombre: client.trim(), mensaje: inputReclamos.trim() }));
      setInputReclamos("");
    }
  };

  const usuarios = {};

  queue.forEach(({ nombre, mensaje }) => {
    if (!usuarios[nombre]) usuarios[nombre] = { consultas: [], reclamos: [] };
    usuarios[nombre].consultas.push(mensaje);
  });

  stack.forEach(({ nombre, mensaje }) => {
    if (!usuarios[nombre]) usuarios[nombre] = { consultas: [], reclamos: [] };
    usuarios[nombre].reclamos.push(mensaje);
  });

  return (
    <>
      <h1>Centro de atención</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nombre del usuario"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <div>
          <input
            type="text"
            placeholder="Consulta"
            value={inputConsultas}
            onChange={(e) => setInputConsultas(e.target.value)}
          />
          <button onClick={handleSubmitConsulta}>Agregar Consulta</button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Reclamo"
            value={inputReclamos}
            onChange={(e) => setInputReclamos(e.target.value)}
          />
          <button onClick={handleSubmitReclamo}>Agregar Reclamo</button>
        </div>
      </form>

      <h2>Usuarios con sus Consultas y Reclamos</h2>
      <ul>
        {Object.entries(usuarios).map(([nombre, { consultas, reclamos }]) => (
          <li key={nombre}>
            <hr />
            <strong>{nombre}</strong>
            <ul>
              <li>
                <strong>Consultas:</strong>
                <ul>
                  {consultas.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </li>
              <li>
                <strong>Reclamos:</strong>
                <ul>
                  {reclamos.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
