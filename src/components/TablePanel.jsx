import DropdownMenu from "./DropdownMenu"

export default function TablePanel({
    tablePanelDataset,
    setSelectedOrder, selectedOrder,
    setSelectedFilter, selectedFilter,
    setSelectedSubFilter, selectedSubFilter,
    setSearchTerm, searchTerm,
    setRouteParams, routeParams,
    // setSearchResults, searchResults,
    addedFilters, setAddedFilters,
    setDisplayTable,
}) {

    const closeSearchMessage = () => {
        setSearchTerm('');
        setDisplayTable(true);
    }

    const handleInputSearchChange = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    }

    const handleOrderOnSelect = (order) => {
        setSelectedOrder(order);
    }

    const handleFilterOnSelect = (filter) => {
        setSelectedFilter(filter);
        // si el filtro no fue seleccionado por el user, se procede a almacenar
        if (!addedFilters.some(obj => obj.value === filter)) {
            setAddedFilters(prev => [...prev, tablePanelDataset.filterSet.find(obj => obj.value === filter)]);
            // pre-busquda usando valor por defecto de subfiltro: Todos
            setRouteParams(prev => ({ ...prev, [filter]: 'Todos' }));
        }
    }

    // establece el SUB filtro seleccionado y los asigna al objeto de parametros 
    const handleSubFilterOnSelect = (filter, selectedValue) => {
        setSelectedSubFilter(prev => ({ ...prev, [filter.label]: selectedValue }));
        setRouteParams(prev => ({ ...prev, [filter.value]: selectedValue }));

        console.log(selectedSubFilter);
    }

    /*
        implementacion de search-as-you-type para realizar busquedas dinamicamente
        puntos clave:
        - setTimeOut: para evitar solicitudes innecesarias a medida que el usuario escribe los datos de entrada (debouncing)
        - AbortController: Permite abortar solicitudes, evitando que las busquedas obsoletas interfieran con la presentacion de los datos actuales
        - useRef: para persistir datos entre sesion de re-renderizado
        - la funcion de limpieza de useEffect: para detener el consumo de memoria del timer y abortar la ultima solicitud
    */

    const handleRemoveFilter = (selected) => {
        setSelectedFilter('');

        setSelectedSubFilter(prev => {
            const { [selected.label]: _, ...newSelectedSubFilters } = prev;
            return newSelectedSubFilters;
        });

        // remover boton de la ui
        setAddedFilters(prev => prev.filter(item => item.value != selected.value));

        // remover filtro en params
        setRouteParams(prev => {
            const { [selected.value]: _, ...newRouteParams } = prev;
            return newRouteParams;
        });
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

        const debounceTimeout = setTimeout(() => {
            getAllUsers(searchTerm, routeParams, signal)
                .then(res => {
                    setIsLoading(true);  // muestra estado de coincidencia en la UI
                    console.log(res);
                })
                .catch(error => console.error('Error en TablePanel', error))
                .finally(() => {
                    setIsLoading(false);
                    abortControllerRef.current = null;
                })
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
                    <h3>Ordernar por</h3>
                    <DropdownMenu
                        dataset={tablePanelDataset.orderSet.order}
                        onSelect={(selected) => handleOrderOnSelect(selected)}
                        selected={selectedOrder}
                        buttonStyle={tablePanelDataset.orderSet.style.button}
                    />

                    {/* <span>Agregar filtro +</span> */}

                    <DropdownMenu
                        dataset={tablePanelDataset.filterSet}
                        onSelect={handleFilterOnSelect}
                        title="Agregar filtro"
                        icon={<i className="bi bi-plus-lg"></i>}
                        itemIcon={<i className="bi bi-plus"></i>}
                        buttonStyle={commonStyles.filter_btn}
                        menuItemStyle={commonStyles.filter_item_btn_test}
                    />
                </div>
                <form>
                    <div id="input-box">
                        <input
                            type="text"
                            placeholder="Buscar empleados"
                            onChange={handleInputSearchChange}
                            value={searchTerm}
                            aria-label="Buscar"
                        />
                        <i className="bi bi-search"></i>
                    </div>
                    {searchTerm &&
                        <span>
                            se muestran los resultados de la búsqueda: <b> {searchTerm}</b><i className="bi bi-x-lg" onClick={closeSearchMessage}></i>
                        </span>
                    }
                </form>
            </div>

            <div className="filter-panel">
                {addedFilters?.map(filter =>
                    <DropdownMenu
                        key={filter.value}
                        dataset={tablePanelDataset.subFilterSet[filter.value]}
                        onSelect={(selectedValue) => handleSubFilterOnSelect(filter, selectedValue)}
                        title={filter.label + ':'}
                        selected={selectedSubFilter[filter.label]}
                        buttonStyle={commonStyles.dropdown_menu_btn}
                        menuStyle={commonStyles.menu}
                        menuItemStyle={commonStyles.menu_item}
                        icon={<i className="bi bi-chevron-down"></i>}
                        removeLabel="Remover filtro"
                        onRemove={() => handleRemoveFilter(filter)}
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

    filter_item_btn_test: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}