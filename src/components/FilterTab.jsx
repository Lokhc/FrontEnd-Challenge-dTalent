import { useState } from "react"

import DropdownMenu from "./Dropdownmenu";

export default function FilterTab({ label }) {
    const [selectedItem, setSelectedItem] = useState("");

    const dropdownMenuItems = [
        { id: 'all', label: 'Todos' },
        { id: 'german', label: 'Alemán' },
        { id: 'remove', label: 'Remover filtro' },
    ];

    const onItemClick = (item) => {
        setSelectedItem(item);
    }

    return (
        <div className="filter-panel">
            <DropdownMenu
                dataset={dropdownMenuItems}
                onItemClick={onItemClick}
                selected={selectedItem}
                style={btnStyle}
                menuStyle={menuStyle}
                menuItemStyle={menuItemStyle}
                icon={<i className="bi bi-chevron-down"></i>}
                label={label}
            />
        </div>
    )
}

const btnStyle = {
    display: 'inline - block',
    padding: '0.6em 1.2em',
    border: 'unset',
    borderRadius: '25px',
    background: '#80808021',
    fontSize: '12px',
    color: 'cornflowerblue',
}

const menuStyle = {
    padding: '0.5rem',
}

const menuItemStyle = {
    padding: '0.5rem',
}