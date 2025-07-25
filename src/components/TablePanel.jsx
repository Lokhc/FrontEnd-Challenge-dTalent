import { useEffect, useState, useRef } from "react";

import DropdownMenu from "./DropdownMenu"

export default function TablePanel({
    tablePanelDataset,
    setSelectedOrder, selectedOrder,
    setSelectedFilter, selectedFilter,
    setSelectedSubFilter, selectedSubFilter,
    setSearchTerm, searchTerm,
    routeParams, setRouteParams,
    setSearchResults, searchResults,
}) {

    // almacena y establece los sub-menus de filtro seleccionados por el user, para que puedan ser renderizados
    const [addedFilters, setAddedFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef(null);

    const handleFilterOnSelect = (filter) => {
        setSelectedFilter(filter);
        // si el filtro no fue seleccionado por el user, se procede a almacenar
        if (!addedFilters.some(obj => obj.value === filter)) {
            setAddedFilters(prev => [...prev, tablePanelDataset.filterSet.find(obj => obj.value === filter)]);
        }
    }

    // establece el SUB filtro seleccionado y los asigna al objeto de parametros 
    const handleSubFilterOnSelect = (filter, selectedValue) => {
        setSelectedSubFilter(prev => ({ ...prev, [filter.label]: selectedValue }));
        setRouteParams(prev => ({ ...prev, [filter.value]: selectedValue }));
    }

    /*
        implementacion de search-as-you-type para realizar busquedas dinamicamente
        puntos clave:
        - setTimeOut: para evitar solicitudes innecesarias a medida que el usuario escribe los datos de entrada (debouncing)
        - AbortController: Permite abortar solicitudes, evitando que las busquedas obsoletas interfieran con la presentacion de los datos actuales
        - useRef: para persistir datos entre sesion de re-renderizado
        - la funcion de limpieza de useEffect: para detener el consumo de memoria del timer
    */

    const handleInputSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    /* useEffect(() => {
        if (searchTerm.trim() === '' || searchTerm.length < 2) {
            setSearchResults(null);
            setIsLoading(false);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            return; // no buscar si el termino esta vacío
        }

        // crear un abort controller para esta busqueda
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        // muestra estado de carga en la UI
        setIsLoading(true);

        const debounceTimeout = setTimeout(() => {
            getUsers(searchTerm, selectedSubFilter, signal)
                .then(res => console.log(res))
                .catch(error => console.error('Error en TablePanel', error))
                .finally(setIsLoading(false))
        }, 500);

        return () => {
            clearTimeout(debounceTimeout);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        }
    }, [searchTerm]); */

    return (
        <div className="table-control-panel">
            <div id="table-panel">
                <div>
                    <h3>Ordernar Por </h3>
                    <DropdownMenu
                        dataset={tablePanelDataset.orderSet}
                        onSelect={setSelectedOrder}
                        selected={selectedOrder}
                    />

                    {/* <span>Agregar filtro +</span> */}

                    <DropdownMenu
                        dataset={tablePanelDataset.filterSet}
                        onSelect={handleFilterOnSelect}
                        selected={selectedFilter}
                        title="Agregar filtro:"
                        icon=" +"
                        style={commonStyles.filter_btn}
                    />
                </div>
                <form>
                    <div id="input-box">
                        <input
                            type="text"
                            placeholder="Buscar empleados"
                            onChange={handleInputSearchChange}
                            aria-label="Buscar"
                        />
                        <i className="bi bi-search"></i>
                    </div>
                    {isLoading && <span>buscando...</span>}
                </form>
            </div>

            <div className="filter-panel">
                {addedFilters.map(filter =>
                    <DropdownMenu
                        key={filter.value}
                        dataset={tablePanelDataset.subFilterSet[filter.value]}
                        onSelect={(selectedValue) => handleSubFilterOnSelect(filter, selectedValue)}
                        selected={selectedSubFilter[filter.label]}
                        title={filter.label}
                        style={commonStyles.dropdown_menu_btn}
                        menuStyle={commonStyles.menu}
                        menuItemStyle={commonStyles.menu_item}
                        icon={<i className="bi bi-chevron-down"></i>}
                    />
                )}
            </div>

        </div>
    )
}

const commonStyles = {
    dropdown_menu_btn: {
        display: 'inline-block',
        padding: '0.6em 1.2em',
        border: 'unset',
        borderRadius: '25px',
        background: '#80808021',
        fontSize: '12px',
        color: 'cornflowerblue',
    },

    menu: {
        padding: '0.5rem',
    },

    menu_item: {
        padding: '0.5rem',
    },

    filter_btn: {
        color: 'cornflowerblue',
        fontSize: '12px',
        paddingLeft: '2rem',
        cursor: 'pointer',
    },
}