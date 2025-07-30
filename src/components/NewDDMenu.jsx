import { useState } from "react";

export default function NewDDMenu({
    menuLabel,
    dataset,
    value,
    style,
    icon
}) {

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(prev => !prev);
    }

    const onClick = () => {
        setSelected()
        setShowMenu(false);
    }

    return (
        <div>
            <button onClick={handleShowMenu}>
                {menuLabel}{selected}{icon}
            </button>
            {showMenu && dataset &&
                <ul>
                    {dataset.map(item => (
                        <li
                            key={item.value || item}
                            onClick={onClick}

                        >{item.label} || {item}</li>
                    ))}
                </ul>
            }

        </div>
    );
}