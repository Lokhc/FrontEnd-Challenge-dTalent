import { useEffect, useState, useRef } from "react";

import { getUsers } from "../services/api";

import DropdownMenu from "./Dropdownmenu"

export default function TablePanel({
    tablePanelDataset,
    setSelectedOrder, selectedOrder,
    setSelectedFilter,
    setSelectedSubFilter, selectedSubFilter,
    setSearchTerm, searchTerm,
    setSearchResults, searchResults,
}) {

    // almacena los submenus de filtro que deben ser renderizados
    const [addedFilters, setAddedFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef(null);

    const handleFilterOnSelect = (filter) => {
        setSelectedFilter(filter);
        if (!addedFilters.includes(filter)) {
            setAddedFilters(prev => [...prev, filter]);
        }
    }

    const handleSubFilterOnSelect = (filter, value) => {
        setSelectedSubFilter(prev => ({ ...prev, [filter]: value }));
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
                        dataset={tablePanelDataset.order}
                        onSelect={setSelectedOrder}
                        selected={selectedOrder || tablePanelDataset.order[0]}
                    />

                    {/* <span>Agregar filtro +</span> */}

                    <DropdownMenu
                        dataset={tablePanelDataset.filter}
                        onSelect={handleFilterOnSelect}
                        selected="Agregar filtro"
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
                        />
                        <i className="bi bi-search"></i>
                    </div>
                    {isLoading && <span>buscando...</span>}
                </form>
            </div>

            {/* <div className="filter-panel">
                {addedFilters.map(item =>
                    <DropdownMenu
                        key={item}
                        dataset={tablePanelDataset.subFilter[item] || []}
                        selected={`${item}: ${selectedSubFilter[item]}`}
                        onSelect={(selectedSub) => handleSubFilterOnSelect(item, selectedSub)}
                        style={commonStyles.dropdown_menu_btn}
                        menuStyle={commonStyles.menu}
                        menuItemStyle={commonStyles.menu_item}
                        icon={<i className="bi bi-chevron-down"></i>}
                    />
                )}
            </div> */}
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