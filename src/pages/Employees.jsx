import { useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import TablePanel from "../components/TablePanel";
import NotFound from "../components/NotFound";

import { getAllUsers, getUsers, URL_BASE } from "../services/api";

export default function Employees() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);

    // estados prop para componente TablePanel
    const [selectedOrder, setSelectedOrder] = useState(() => localStorage.getItem('selected_order') || '');
    const [selectedFilter, setSelectedFilter] = useState(() => localStorage.getItem('selected_fitler') || '');

    const [selectedSubFilters, setSelectedSubFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    // setup para labels de opciones y de estilos para menu contextual definidos en TablePanel
    const tablepanel_dataset = {
        order: ['Número', 'Más recientes', 'Más antiguos', 'Nombre', 'Apellido', 'Correo electrónico'],
        filter: [
            { label: 'Tipo de remuneración', value: 'paymentType' },
            { label: 'Cargo', value: 'position' },
            { label: 'Sector', value: 'sector' },
            { label: 'Turno', value: 'workshift' },
            { label: 'Activo', value: 'active' },
            { label: 'Nacionalidad', value: 'nationality' },
            { label: 'Rol', value: 'role' },
        ],

        // paymentType + Jornalero 

        subFilters: {
            paymentType: { title: 'Tipo de remuneración', options: ['Todos', 'Jornalero'] },
            position: { title: 'Cargo', options: ['Todos', 'Frontend', 'Backend', 'FullStack'] },
            sector: { title: 'Sector', options: ['Todos', 'Dev', 'Remover filtro'] },
            shift: { title: 'Turno', options: ['Todos', '8-16'] },
            active: { title: 'Activo', options: ['Todos', 'Activo', 'Inactivo'] },
            nationality: { title: 'Nacionalidad', options: ['Todos', 'Alemán', 'Remover filtro'] },
            role: { title: 'Rol', options: ['Funcionario', 'Supervisor'] },
        }
    };

    /* const fetchAllUsers = () => {
        setLoading(true);
        getAllUsers()
            .then(res => {
                setUsers(res.results);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    } */

    const fetchUsersParams = () => {
        getUsers(searchTerm, selectedSubFilters)
            .then(res => {
                // guardar estado
                console.log(res);
            })
            .catch(err => console.error(err))
            .finally(() => console.log(finalizado));
    }

    // llamadas a API
    useEffect(() => {
        /* fetchAllUsers(); */
        fetchUsersParams();
    }, []);

    // persistencia de estados durante re-renderizado
    useEffect(() => {
        localStorage.setItem('selected_order', selectedOrder);
        localStorage.setItem('selected_filter', selectedFilter);
    }, [selectedOrder, selectedFilter]);

    // funcion de ordenamiento para la tabla
    const sortTable = (tableData, sortBy) => {
        const table = [...tableData].sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            if (a.sortBy < b.sortBy) {
                return -1;
            }
            return 0;
        });
        console.log(table);
    }

    return (
        <section>
            <div id="top-content">
                <div id="box">
                    <div>
                        <h2>Lista de Empleados </h2>
                        <span>1</span>
                    </div>
                    <div>
                        <button onClick={() => sortTable(users, "number")}>IMPORTAR</button>
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
                    setSelectedSubFilter={setSelectedSubFilters}
                    selectedSubFilter={selectedSubFilters}

                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Número</th>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Teléfono/celular</th>
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

                <Pagination />



                {/* <NotFound /> */}

            </div>
        </section>
    );
}