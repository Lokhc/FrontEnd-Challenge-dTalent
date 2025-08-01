import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";

import { getAllUsers, getAllReceipts } from "../services/api";

import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
    // estados para Employees
    const [employeeSelectedOrder, setEmployeeSelectedOrder] = useState('');
    const [employeeSelectedFilter, setEmployeeSelectedFilter] = useState('');
    const [employeeSelectedSubFilters, setEmployeeSelectedSubFilters] = useState({});
    const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
    const [employeeRouteParams, setEmployeeRouteParams] = useState({});
    const [employeeAddedFilters, setEmployeeAddedFilters] = useState([]);
    const [users, setUsers] = useState([]);
    const [isEmployeeLoading, setEmployeeLoading] = useState(false);
    const [displayEmployeeTable, setDisplayEmployeeTable] = useState(true);

    const fetchAllUsers = () => {
        setEmployeeLoading(true);
        getAllUsers(employeeSearchTerm, employeeRouteParams)
            .then(res => {
                setUsers(res.results);
                // si no se encontraron resultados mostrar NotFound
                setDisplayEmployeeTable(res.results.length > 0);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setEmployeeLoading(false);
            });
    }

    useEffect(() => {
        fetchAllUsers();
    }, [employeeRouteParams]);

    const abortControllerRef = useRef(null);
    const [employeeSearchResults, setEmployeeSearchResults] = useState([]);

    // search-as-you-type
    useEffect(() => {
        if (employeeSearchTerm.trim() === '' || employeeSearchTerm.length < 2) {
            setEmployeeSearchResults([]);
            setDisplayEmployeeTable(true);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            return; // no buscar si el termino esta vacío
        }

        // crear un abort controller para esta busqueda
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const debounceTimeout = setTimeout(() => {
            getAllUsers(employeeSearchTerm, employeeRouteParams, signal)
                .then(res => {
                    setEmployeeSearchResults(res.results); // cargar datos de busqueda
                    setDisplayEmployeeTable(res.results.length > 0); // si no hay resultados - NotFound
                })
                .catch(error => console.error('Error al realizar busqueda dinámica', error))
                .finally(() => {
                    abortControllerRef.current = null;
                })
        }, 500);

        return () => {
            clearTimeout(debounceTimeout);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        }
    }, [employeeSearchTerm]);

    const processedEmployeeData = useMemo(() => {
        let baseData = [];

        if (employeeSearchTerm && employeeSearchResults !== null) {
            baseData = employeeSearchResults;
        } else {
            baseData = users;
        }

        // aplicar filtros y ordenamiento que ya fueron seleccionados

        if (baseData.length === 0) {
            return [];
        }

        let finalData = [...baseData];

        return finalData;
    }, [users, employeeSearchResults, employeeSearchTerm]);

    // estados para Receipts
    const [receiptSelectedOrder, setReceiptSelectedOrder] = useState('');
    const [receiptSelectedFilter, setReceiptSelectedFilter] = useState('');
    const [receiptSelectedSubFilters, setReceiptSelectedSubFilters] = useState({});
    const [receiptSearchTerm, setReceiptSearchTerm] = useState('');
    const [receiptRouteParams, setReceiptRouteParams] = useState([]);
    const [receiptAddedFilters, setReceiptAddedFilters] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [isReceiptLoading, setReceiptLoading] = useState(false);
    const [displayReceiptTable, setDisplayReceiptTable] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [receiptFile, setReceiptFile] = useState(null);
    const [isModalContentLoading, setModalContentLoading] = useState(false);

    const fetchAllReceipts = () => {
        setReceiptLoading(true);
        getAllReceipts(receiptSearchTerm, receiptRouteParams)
            .then(res => {
                setReceipts(res.results);
            })
            .catch(err => console.error(err))
            .finally(() => setReceiptLoading(false));
    }

    useEffect(() => {
        fetchAllReceipts();
    }, [receiptRouteParams]);

    return (
        <>
            {showModal &&
                <Modal
                    setShowModal={setShowModal}
                    pdfURL={receiptFile}
                    isModalContentLoading={isModalContentLoading}
                />}
            <Sidebar />
            <Outlet context={{
                employee: {
                    selectedOrder: employeeSelectedOrder, setSelectedOrder: setEmployeeSelectedOrder,
                    selectedFilter: employeeSelectedFilter, setSelectedFilter: setEmployeeSelectedFilter,
                    selectedSubFilters: employeeSelectedSubFilters, setSelectedSubFilters: setEmployeeSelectedSubFilters,
                    routeParams: employeeRouteParams, setRouteParams: setEmployeeRouteParams,
                    searchTerm: employeeSearchTerm, setSearchTerm: setEmployeeSearchTerm,
                    users: processedEmployeeData, setUsers: setUsers,
                    isLoading: isEmployeeLoading, setLoading: setEmployeeLoading,
                    displayTable: displayEmployeeTable, setDisplayTable: setDisplayEmployeeTable,
                    addedFilters: employeeAddedFilters, setAddedFilters: setEmployeeAddedFilters,
                    searchResults: employeeSearchResults, setSearchResults: setEmployeeSearchResults,
                },

                receipt: {
                    selectedOrder: receiptSelectedOrder, setSelectedOrder: setReceiptSelectedOrder,
                    selectedFilter: receiptSelectedFilter, setSelectedFilter: setReceiptSelectedFilter,
                    selectedSubFilters: receiptSelectedSubFilters, setSelectedSubFilters: setReceiptSelectedSubFilters,
                    routeParams: receiptRouteParams, setRouteParams: setReceiptRouteParams,
                    searchTerm: receiptSearchTerm, setSearchTerm: setReceiptSearchTerm,
                    receipts: receipts, setReceipts: setReceipts,
                    isLoading: isReceiptLoading, setLoading: setReceiptLoading,
                    displayTable: displayReceiptTable, setDisplayTable: setDisplayReceiptTable,
                    addedFilters: receiptAddedFilters, setAddedFilters: setReceiptAddedFilters,
                    setShowModal: setShowModal,
                    receiptFile: receiptFile, setReceiptFile: setReceiptFile,
                    isModalContentLoading: isModalContentLoading, setModalContentLoading: setModalContentLoading
                }
            }} />
        </>
    );
}