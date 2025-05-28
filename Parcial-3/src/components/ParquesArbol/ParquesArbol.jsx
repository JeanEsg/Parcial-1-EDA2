import Tree from 'react-d3-tree';
import styles from './ParquesArbol.module.css';

const ParquesArbol = ({ arbol }) => {
    if (!arbol) return <div className={styles.sinArbol}>No hay zonas para mostrar</div>;


    const prepararDatos = (nodo) => ({
        name: nodo.nombre,
        children: nodo.subzonas.map(prepararDatos),
    });

    const datos = prepararDatos(arbol.raiz);

    return (
        <div id="contenedor-arbol" className={styles.contenedor}>
            <Tree
                data={datos}
                orientation="vertical"
                pathFunc="elbow"
                translate={{ x: 250, y: 50 }}
                collapsible={false}
                zoomable={true}
            />
        </div>
    );
};

export default ParquesArbol;
