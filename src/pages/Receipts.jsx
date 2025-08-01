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
        setShowModal,
        receiptFile, setReceiptFile,
        isModalContentLoading, setModalContentLoading
    } = receipt;

    const tablepanel_dataset = {
        orderSet: {
            order: ['Más recientes', 'Más antiguos', 'Tipo'],
            style: {
                button: {
                    paddingLeft: '0.5rem'
                }
            },
        },

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

    const handleListItemClick = async (listItemData) => {
        setShowModal(true);
        const receiptID = listItemData.id;

        setModalContentLoading(true);

        try {
            const response = await fetch(`https://api.schneck.dlab.software/api/receipts/${receiptID}/file`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al obtener archivo: ${errorData.detail || response.status}`);
            }

            setReceiptFile(data.file);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setModalContentLoading(false);
        }
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

const ModalContent = () => {
    return (
        <>
            {isModalContentLoading ? (
                <div className="modal-loader">
                    <Spinner />
                    <h3>Cargando archivo</h3>
                </div>
            ) : (
                <div className="modal-content">
                    <iframe
                        src={pdfURL}
                        width="100%"
                        height="500px"
                    >
                        Tu navegador no soporta iframes, pero puedes descargar el PDF.
                    </iframe>

                    <div className="modal-footer">
                        <button onClick={() => setShowModal(false)}>CERRAR</button>
                        <div>
                            <a href=""><i className="bi bi-box-arrow-up-right"></i></a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}