import { useState } from "react";

export default function DropdownMenu({
    dataset,
    onSelect,
    title,
    selected,
    value,
    style,
    icon,
    menuStyle,
    menuItemStyle
}) {
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(prevState => !prevState);
    }

    const handleOnSelect = (label) => {
        onSelect(label);
        setShowMenu(false);
    }

    /**
     * dataset: ['Todos',  'Otro']
    */

    return (
        <div className="dropdown-menu" >
            <button onClick={handleClick} style={style} aria-haspopup>
                {title} {selected}
                {icon || <i className="bi bi-caret-down-fill"></i>}
            </button>
            {showMenu && dataset &&
                <ul style={menuStyle}>
                    {dataset.map(item => (
                        <li
                            key={item.value || item}
                            onClick={() => handleOnSelect(item.value || item)}
                            role="option"
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