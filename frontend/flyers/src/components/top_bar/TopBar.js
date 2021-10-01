import "./TopBar.css";

const TopBar = ({onToggleMenu }) => {

    return (
        <div className="d-flex w-100 bg-app-primary top-bar mb-auto w-100">
            <i onClick={onToggleMenu} className="bi bi-list text-light my-auto ms-2 mr-auto"></i>
            <h1 className="title text-light my-auto ms-3">Shopfully</h1>
        </div>
    )
}

export default TopBar;