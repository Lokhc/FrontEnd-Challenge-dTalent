import { useState } from "react";

export default function DropdownMenu({
    title,
    dataset,
    onSelect,
    selected,
    buttonStyle,
    menuStyle,
    menuItemStyle,
    icon,
    itemIcon,
    onRemove,
    removeLabel,
}) {
    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(prevState => !prevState);
    }

    const handleOnSelect = (label) => {
        onSelect(label);
        setShowMenu(false);
    }

    const removeMenu = () => {
        onRemove();
        setShowMenu(false);
    }

    return (
        <div className="dropdown-menu" >
            <button onClick={handleShowMenu} style={buttonStyle} aria-haspopup>
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
                            {item.label || item} {itemIcon}
                        </li>
                    ))}
                    {removeLabel && <li onClick={removeMenu}>{removeLabel}</li>}
                </ul>
            }
        </div>
    );
}

/* { transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)' } */
/* style={{ display: showMenu ? 'block' : 'none' }} */