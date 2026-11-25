export function limpiarFiltros(filtros) { //llega el objeto { title: x, house, x } (1
    return Object.fromEntries( // rearma el objeto que desarmó entries() (4
        Object.entries(// convierte en array clave,valor [[title, x], [house:x]] (2
            filtros).filter(([, valor]) => valor)) // si hay un par que no tiene valor, lo quita (3
}

// 