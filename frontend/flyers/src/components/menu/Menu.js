import MenuItem from "./menu-item/MenuItem";
import "./Menu.css";
import logo from "../../logo.png";

const Menu = ({ items, isMenuShown = false, onSelectFlyer, onToggleMenu, selectedFlyerId }) => {
    
    return (
        <div className={`menu-container mt-auto ${isMenuShown ? "" : "d-none"}`}>

            <div className={`menu d-flex flex-column`} id="mainMenuContainer">

                <div className="heading ms-2 my-4 px-2">
                    <img src={logo} className="img-fluid" alt="app logo" />

                    <h2 className="text-dark mt-3 mb-1" style={{ fontSize: "1.4rem" }}>Favourites</h2>

                    <span>The list of your preferred flyers</span>
                </div>

                <div className="line"></div>

                <div className="d-flex flex-column px-2">
                    {items.length === 0 ? <span className="p-2 my-2"> There are no items to see... Save a flayer and get back here to see something. </span> : ""}
                    {items.map((item, i) => <MenuItem key={`menu_item_main_${item.id}`} selectedFlyerId={selectedFlyerId} item={item} onSelectFlyer={() => onSelectFlyer(item.id)} />)}
                </div>
            </div>

        </div>
    )
}

export default Menu;