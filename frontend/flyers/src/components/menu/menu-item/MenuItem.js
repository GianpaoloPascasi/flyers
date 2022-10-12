import "./MenuItem.css";

const MenuItem = ({ item, selectedFlyerId, onSelectFlyer }) => {
    return (
        <div className={`d-flex menu-item align-items-center justify-content-start p-2 my-2 rounded ${item.id === selectedFlyerId ? "selected" : ""}`} onClick={onSelectFlyer}>
            <i className="bi bi-heart-fill me-4" />
            <span>{item.title}</span>
        </div >
    )
}

export default MenuItem;