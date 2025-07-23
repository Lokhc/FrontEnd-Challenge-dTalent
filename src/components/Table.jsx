import { useEffect, useState } from "react";
import TablePanel from "./TablePanel";

export default function Table({ children, dataset }) {

    /* useEffect(() => {
        console.log(dataset);
    }, []);

    const popultate = () => {

    }

    return (
        <table>
            {children}
            <tbody>
                {dataset.map(objRes =>
                    <tr>
                        <td>{objRes.type}</td>
                        <td>{objRes.employeeFullName}</td>
                        <td>{objRes.year}/{objRes.month}</td>
                        <td>{objRes.isSended ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle-fill"></i>}</td>
                        <td>{objRes.isReaded ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle-fill"></i>}</td>
                        <td>{objRes.isSigned ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle-fill"></i>}</td>
                        <td><i className="bi bi-pencil-fill"></i></td>
                    </tr>
                )}
            </tbody>
        </table>
    ); */




    return (


        


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
                        <tr>
                            <td>
                                <span className="td-initials">{objRes.initials}</span>
                            </td>
                            <td>#{objRes.employeeNumber}</td>
                            <td>{objRes.employeeFullName}</td>
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
    )










}