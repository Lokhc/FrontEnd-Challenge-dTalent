import { useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import TablePanel from "../components/TablePanel";

import { getAllReceipts } from "../services/api";

export default function Receipts() {
    const [receipts, setReceipts] = useState([]);
    const [isLoading, setLoading] = useState(false);

    // child components states for TablePanel
    const [selectedOrderItem, setSelectedOrderItem] = useState(""); // testing unidirectional flow         1
    const [selectedFilterItem, setSelectedFilterItem] = useState(""); // testing unidirectional flow       2
    const [selectedFilterOption, setSelectedFilterOption] = useState(""); // testing unidirectional flow   3

    const tablePanelDataset = {
        orderMenuItems: [
            { id: 'recent', label: 'Más recientes' },
            { id: 'older', label: 'Más antiguos' },
            { id: 'type', label: 'Tipo' },
        ],

        filterMenuItems: [
            { id: 'remunarationType', label: 'Tipo de reumneracion' },
            { id: 'sector', label: 'Sector' },
            { id: 'year', label: 'Año' },
            { id: 'month', label: 'Mes' },
            { id: 'sent', label: 'Enviado' },
            { id: 'read', label: 'Leído' },
        ],

        filterOptions: [
            { id: 'all', label: 'Todos' },
            { id: 'yes', label: 'Si' },
            { id: 'no', label: 'No' }
        ],

        Año: [
            { id: "2022", label: "2022" },
            { id: "2023", label: "2023" },
            { id: "2024", label: "2024" },
            { id: "2025", label: "2025" }
        ],

        Mes: [
            { id: "jan", label: "Enero" },
            { id: "feb", label: "Febrero" },
            { id: "mar", label: "Marzo" },
            { id: "apr", label: "Abril" },
            { id: "may", label: "Mayo" },
            { id: "jun", label: "Junio" },
            { id: "jul", label: "Julio" },
            { id: "aug", label: "Agosto" },
            { id: "sep", label: "Septiembre" },
            { id: "oct", label: "Octubre" },
            { id: "nov", label: "Noviembre" },
            { id: "dec", label: "Diciembre" },
        ],

        Enviado: [
            { id: 'all', label: 'Todos' },
            { id: 'yes', label: 'Si' },
            { id: 'no', label: 'No' },
            { id: 'remove', label: 'Remover filtro' },
        ],

        "Leído": [
            { id: 'all', label: 'Todos' },
            { id: 'yes', label: 'Si' },
            { id: 'no', label: 'No' },
            { id: 'remove', label: 'Remover filtro' },
        ],

        styles: {
            btnStyle: {
                display: 'inline - block',
                padding: '0.6em 1.2em',
                border: 'unset',
                borderRadius: '25px',
                background: '#80808021',
                fontSize: '12px',
                color: 'cornflowerblue',
            },

            menuStyle: {
                padding: '0.5rem',
            },

            menuItemStyle: {
                padding: '0.5rem',
            },

            filterBtnStyle: {
                color: 'cornflowerblue',
                fontSize: '12px',
                paddingLeft: '2rem',
                cursor: 'pointer',
            }
        }
    }

    const fetchAllReceipts = () => {
        setLoading(true);
        getAllReceipts()
            .then(res => {
                setReceipts(res.results);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchAllReceipts();
    }, []);

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
                    tablePanelDataset={tablePanelDataset}
                    setSelectedOrderItem={setSelectedOrderItem}
                    selectedOrderItem={selectedOrderItem}
                    setSelectedFilterItem={setSelectedFilterItem}
                    selectedFilterItem={selectedFilterItem}
                    setSelectedFilterOption={setSelectedFilterOption}
                    selectedFilterOption={selectedFilterOption}
                />

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
                                <tr>
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

                <Pagination />
            </div>
        </section>
    );
}