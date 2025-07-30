import { useOutletContext } from "react-router-dom";

import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import TablePanel from "../components/TablePanel";
import NotFound from "../components/NotFound";

export default function Employees() {
    const { employee } = useOutletContext();
    const {
        selectedOrder, setSelectedOrder,
        selectedFilter, setSelectedFilter,
        selectedSubFilters, setSelectedSubFilters,
        routeParams, setRouteParams,
        searchTerm, setSearchTerm,
        users, setUsers,
        isLoading, setLoading,
        displayTable, setDisplayTable,
        addedFilters, setAddedFilters,
        searchResults, setSearchResults
    } = employee;

    /*
    * tablepanel_dataset:
    * Contiene configuracion incial de labels y values utilizados para los drowpdownMenus en TablePanel
    * Puede incluir configuracion de estilos
    */

    const tablepanel_dataset = {
        orderSet: {
            order: ['Número', 'Más recientes', 'Más antiguos', 'Nombre', 'Apellido', 'Correo electrónico'],
            style: {
                button: {
                    paddingLeft: '0.5rem'
                }
            },
        },

        filterSet: [
            { label: 'Tipo de remuneración', value: 'paymentType' },
            { label: 'Cargo', value: 'position' },
            { label: 'Sector', value: 'sector' },
            { label: 'Turno', value: 'workShift' },
            { label: 'Activo', value: 'isActive' },
            { label: 'Nacionalidad', value: 'nationality' },
            { label: 'Rol', value: 'role' },
        ],

        subFilterSet: {
            paymentType: ['Todos', 'Jornalero'],
            position: ['Todos', 'Frontend', 'Backend', 'FullStack'],
            workShift: ['Todos', '8-16'],
            isActive: ['Todos', 'Si', 'No'],
            sector: ['Todos', 'Dev'],
            nationality: ['Todos', 'Alemán', 'Paraguaya'],
            role: ['Funcionario', 'Supervisor']
        }
    };

    // idk
    const sortTable = (usersDataset, criteria) => {
        switch (criteria) {
            case 'number':
                return usersDataset.sort((a, b) => a.employeeNumber - b.employeeNumber)
            case 'mostRecent':
                return usersDataset.sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt));
            case 'older':
                return usersDataset.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));
            case 'name':
                return usersDataset.sort((a, b) => a.name.localeCompare(b.name));
            case 'lastName':
                return usersDataset.sort((a, b) => a.lastName?.localeCompare(b.lastName));
            case 'email':
                return usersDataset.sort((a, b) => a.email?.localeCompare(b.email));
            default:
                return usersDataset;
        }
    }

    // reorganiza los usuarios segun el orden seleccionado
    /* useEffect(() => {
        setUsers(prev => sortTable(prev, selectedOrder));
    }, [selectedOrder]); */

    return (
        <section>
            <div id="top-content">
                <div id="box">
                    <div>
                        <h2>Lista de Empleados </h2>
                        <span>1</span>
                    </div>
                    <div>
                        <button onClick={() => console.log('IMPORTAR')}>IMPORTAR</button>
                        <button><i className="bi bi-plus-lg"></i> NUEVO EMPLEADO</button>
                    </div>
                </div>
            </div>
            <div id="center-content">

                {/* panel de control de la tabla */}
                <TablePanel
                    tablePanelDataset={tablepanel_dataset} setSelectedOrder={setSelectedOrder}
                    selectedOrder={selectedOrder}
                    setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter}
                    selectedSubFilter={selectedSubFilters} setSelectedSubFilter={setSelectedSubFilters}
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    routeParams={routeParams} setRouteParams={setRouteParams}
                    addedFilters={addedFilters} setAddedFilters={setAddedFilters}
                    setDisplayTable={setDisplayTable}
                    searchResults={searchResults} setSearchResults={setSearchResults}
                    setUsers={setUsers}
                />

                {displayTable ? (
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Número</th>
                                <th>Nombre</th>
                                <th>Correo Electrónico</th>
                                <th>Teléfono/Celular</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="7"><Spinner /></td></tr>
                            ) : (
                                users.map(objRes =>
                                    <tr key={objRes.id}>
                                        <td>
                                            <span className="td-initials">{objRes.initials}</span>
                                        </td>
                                        <td>#{objRes.employeeNumber}</td>
                                        <td>{objRes.fullName}</td>
                                        <td>{objRes.email}</td>
                                        <td>{objRes.phoneNumber}</td>
                                        <td>
                                            <span className="td-isActive">{objRes.isActive ? 'Activo' : 'Inactivo'}</span>
                                        </td>
                                        <td><i className="bi bi-pencil-fill"></i></td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                ) : (
                    <NotFound />
                )}

                <Pagination />

            </div>
        </section>
    );
}