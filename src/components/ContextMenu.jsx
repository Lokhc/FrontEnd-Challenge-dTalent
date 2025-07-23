export default function ContextMenu() {
    return (
        <div id="dropdown-menu">
            <button onClick={handleClick}>{selected} <i className="bi bi-caret-down-fill" style={{ transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}></i></button>

            <ul style={{ display: showMenu ? 'block' : 'none' }}>
                {dataset.map(item => (
                    <li key={item.id} onClick={() => onItemClick(item.label)}>{item.label}</li>
                ))}
            </ul>
        </div>
    )
}