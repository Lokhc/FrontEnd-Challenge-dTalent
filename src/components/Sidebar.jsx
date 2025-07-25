import { Link } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const menuItems = [
        { id: 'employees', label: 'Emepleados', icon: <i className="bi bi-people-fill"></i> },
        { id: 'receipts', label: 'Recibos', icon: <i className="bi bi-receipt"></i> },
        { id: 'communicated', label: 'Comunicados', icon: <i className="bi bi-inbox-fill"></i> },
        { id: 'settings', label: 'Configuración', icon: <i className="bi bi-gear-fill"></i> },
    ];

    return (
        <aside>
            <div>
                <div>
                    <img src="/dTalentLogo.png" alt="logo" />
                </div>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.id}>
                            <NavLink to={item.id} className={({ isActive }) => isActive ? 'active' : ''} >{item.icon} {item.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <AccountPanel />
        </aside>
    );
}

function AccountPanel() {
    return (
        <div id="account-panel">
            <div>
                <i className="bi bi-person-circle"></i>
                <div>
                    <h5>Bienvenido</h5>
                    <h3>dLab</h3>
                </div>
            </div>
            <i className="bi bi-three-dots-vertical"></i>
        </div>
    );
}