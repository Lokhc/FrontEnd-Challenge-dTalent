import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { getAllUsers, getAllReceipts } from "../services/api";

import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
    // estados para Employees
    const [employeeSelectedOrder, setEmployeeSelectedOrder] = useState();
    const [employeeSelectedFilter, setEmployeeSelectedFilter] = useState();
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
                if (res.results.length === 0) {
                    setDisplayEmployeeTable(false);
                } else {
                    setDisplayEmployeeTable(true);
                }
            })
            .catch(err => console.error(err))
            .finally(() => {
                setEmployeeLoading(false);
            });
    }

    useEffect(() => {
        fetchAllUsers();
    }, [employeeRouteParams]);

    // sortTable.

    // estados para Receipts
    const [receiptSelectedOrder, setReceiptSelectedOrder] = useState();
    const [receiptSelectedFilter, setReceiptSelectedFilter] = useState();
    const [receiptSelectedSubFilters, setReceiptSelectedSubFilters] = useState({});
    const [receiptSearchTerm, setReceiptSearchTerm] = useState('');
    const [receiptRouteParams, setReceiptRouteParams] = useState([]);
    const [receiptAddedFilters, setReceiptAddedFilters] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [isReceiptLoading, setReceiptLoading] = useState(false);
    const [displayReceiptTable, setDisplayReceiptTable] = useState(true);

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
            <Sidebar />
            <Outlet context={{
                employee: {
                    selectedOrder: employeeSelectedOrder, setSelectedOrder: setEmployeeSelectedOrder,
                    selectedFilter: employeeSelectedFilter, setSelectedFilter: setEmployeeSelectedFilter,
                    selectedSubFilters: employeeSelectedSubFilters, setSelectedSubFilters: setEmployeeSelectedSubFilters,
                    routeParams: employeeRouteParams, setRouteParams: setEmployeeRouteParams,
                    searchTerm: employeeSearchTerm, setSearchTerm: setEmployeeSearchTerm,
                    users: users, setUsers: setUsers,
                    isLoading: isEmployeeLoading, setLoading: setEmployeeLoading,
                    displayTable: displayEmployeeTable, setDisplayTable: setDisplayEmployeeTable,
                    addedFilters: employeeAddedFilters, setAddedFilters: setEmployeeAddedFilters
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
                }
            }} />
        </>
    );
}