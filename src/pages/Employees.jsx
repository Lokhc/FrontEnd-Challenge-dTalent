import { useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import TablePanel from "../components/TablePanel";
import NotFound from "../components/NotFound";

import { getAllUsers } from "../services/api";

export default function Employees() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(() => localStorage.getItem('selected_order') || ''); // storage obsoleto
    const [selectedFilter, setSelectedFilter] = useState(() => localStorage.getItem('selected_fitler') || '');
    const [selectedSubFilters, setSelectedSubFilters] = useState({});

    // parametros de ruta
    const [routeParams, setRouteParams] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const [displayTable, setDisplayTable] = useState(true);

    /* 
    * tablepanel_dataset:
    * Contiene configuracion incial de labels y values utilizados para los drowpdownMenus en TablePanel
    * Puede incluir configuracion de estilos
    */

    const tablepanel_dataset = {
        orderSet: [
            { label: 'Número', value: 'number' },
            { label: 'Más recientes', value: 'mostRecent' },
            { label: 'Más antiguos', value: 'oldest' },
            { label: 'Nombre', value: 'firstName' },
            { label: 'Apellido', value: 'lastName' },
            { label: 'Correo electrónico', value: 'email' },
        ],

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

    const fetchAllUsers = () => {
        setLoading(true);
        getAllUsers(searchTerm, routeParams)
            .then(res => {
                setUsers(res.results);
                // si no se encontraron resultados mostrar NotFound
                if (res.results.length === 0) {
                    setDisplayTable(false);
                } else {
                    setDisplayTable(true);
                }
            })
            .catch(err => console.error(err))
            .finally(() => {
                setLoading(false);
            });
    }

    // llamadas a API
    useEffect(() => {
        fetchAllUsers();
    }, [routeParams]);

    // persistencia de estados durante re-renderizado
    useEffect(() => {
        localStorage.setItem('selected_order', selectedOrder);
        localStorage.setItem('selected_filter', selectedFilter);
    }, [selectedOrder, selectedFilter]);

    return (
        <section>
            <div id="top-content">
                <div id="box">
                    <div>
                        <h2>Lista de Empleados </h2>
                        <span>1</span>
                    </div>
                    <div>
                        <button onClick={() => {
                            let testQuery = buildQuery(searchTerm, routeParams);
                            console.log(testQuery);
                        }}>IMPORTAR</button>
                        <button><i className="bi bi-plus-lg"></i> NUEVO EMPLEADO</button>
                    </div>
                </div>
            </div>
            <div id="center-content">

                {/* panel de control de la tabla */}
                <TablePanel
                    tablePanelDataset={tablepanel_dataset}
                    setSelectedOrder={setSelectedOrder}
                    selectedOrder={selectedOrder}
                    setSelectedFilter={setSelectedFilter}
                    selectedFilter={selectedFilter}
                    setSelectedSubFilter={setSelectedSubFilters}
                    selectedSubFilter={selectedSubFilters}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setRouteParams={setRouteParams}
                    routeParams={routeParams}
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