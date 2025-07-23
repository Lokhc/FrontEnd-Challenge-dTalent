import { useState } from "react";

export default function DropdownMenu({ dataset, onSelect, selected, style, icon, menuStyle, menuItemStyle }) {
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(prevState => !prevState);
    }

    const handleOnSelect = (label) => {
        onSelect(label);
        setShowMenu(false);
    }

    return (
        <div id="dropdown-menu" >
            <button onClick={handleClick} style={style}>
                {selected}{icon ? icon : <i className="bi bi-caret-down-fill"></i>}
            </button>
            {showMenu &&
                <ul style={menuStyle}>
                    {dataset.map(item => (
                        <li
                            key={item.label || item}
                            onClick={() => handleOnSelect(item.value || item)}
                            style={menuItemStyle}
                        >
                            {item.label || item}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

/* { transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)' } */
/* style={{ display: showMenu ? 'block' : 'none' }} */