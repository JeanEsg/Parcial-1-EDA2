import Botones from './components/Botones/Botones';
import CiudadCard from './components/CiudadesCard/CiudadCard';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.contenedorApp}>
      <h1>Red de Ciudades con Zonas Verdes</h1>
      <Botones />
      <CiudadCard />
    </div>
  );
};

export default App;
