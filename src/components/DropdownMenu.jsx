import { useState } from "react";

export default function DropdownMenu({
    dataset,
    onSelect,
    selected,
    title,
    style,
    icon,
    menuStyle,
    menuItemStyle
}) {

    const [showMenu, setShowMenu] = useState(false);
    const [label, setLabel] = useState('');

    const handleClick = () => {
        setShowMenu(prevState => !prevState);
    }

    const handleOnSelect = (label) => {
        onSelect(label);
        setShowMenu(false);
    }

    const DropDownMenuSetup = () => { }

    /**
     * dataset: ['Todos',  'Otro']
     */

    return (
        <div id="dropdown-menu" >
            <button onClick={handleClick} style={style} aria-haspopup>
                {title || label}
                {icon || <i className="bi bi-caret-down-fill"></i>}
            </button>
            {showMenu && dataset &&
                <ul style={menuStyle}>
                    {dataset.map(item => (
                        <li
                            key={item.value || item}
                            onClick={() => {
                                handleOnSelect(item.value || item);
                                setLabel(item.label || item);
                            }}
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