import { useOutletContext } from "react-router-dom";

import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import TablePanel from "../components/TablePanel";
import NotFound from "../components/NotFound";

export default function Receipts() {
    const { receipt } = useOutletContext();
    const {
        selectedOrder, setSelectedOrder,
        selectedFilter, setSelectedFilter,
        selectedSubFilters, setSelectedSubFilters,
        routeParams, setRouteParams,
        searchTerm, setSearchTerm,
        receipts, setReceipts,
        isLoading, setLoading,
        displayTable, setDisplayTable,
        addedFilters, setAddedFilters,
    } = receipt;

    const tablepanel_dataset = {
        orderSet: [
            { label: 'Más recientes', value: 'mostRecent' },
            { label: 'Más antiguos', value: 'oldest' },
            { label: 'Tipo', value: 'type' },
        ],

        filterSet: [
            { label: 'Tipo de remuneración', value: 'paymentType' },
            { label: 'Sector', value: 'sector' },
            { label: 'Año', value: 'year' },
            { label: 'Mes', value: 'month' },
            { label: 'Enviado', value: 'sended' },
            { label: 'Leído', value: 'readed' },
        ],

        subFilterSet: {
            paymentType: ['Todos', 'Jornalero'],
            sector: ['Todos', 'Dev'],
            year: ['2023', '2024', '2025'],
            month: ['Todos', 'Enero', 'Febrero'],
            sended: ['Todos', 'Sí', 'No'], // boolean
            readed: ['Todos', 'Sí', 'No'], // boolean
        }
    };

    const handleListItemClick = (listItemData) => {
        console.log(listItemData);
    }

    return (
        <section>
            <div id="top-content">
                <div id="box">
                    <div>
                        <h2>Lista de Recibos </h2>
                        <span>1</span>
                    </div>
                    <div>
                        <button><i className="bi bi-arrow-clockwise"></i> REFRESCAR LISTA DE RECIBOS</button>
                    </div>
                </div>
            </div>

            <div id="center-content">
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
                    displayTable={displayTable}
                    setDisplayTable={setDisplayTable}
                    addedFilters={addedFilters}
                    setAddedFilters={setAddedFilters}
                />

                {displayTable ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Empleado</th>
                                <th>Fecha</th>
                                <th>Enviado</th>
                                <th>Leído</th>
                                <th>Firmado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="7"><Spinner /></td></tr>
                            ) : (
                                receipts.map(objRes =>
                                    <tr key={objRes.id} onClick={() => handleListItemClick(objRes)} id="receipts-tr">
                                        <td>{objRes.type}</td>
                                        <td>{objRes.employeeFullName}</td>
                                        <td>{objRes.month}/{objRes.year}</td>
                                        <td>{objRes.isSended ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle-fill"></i>}</td>
                                        <td>{objRes.isReaded ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle-fill"></i>}</td>
                                        <td>{objRes.isSigned ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle-fill"></i>}</td>
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