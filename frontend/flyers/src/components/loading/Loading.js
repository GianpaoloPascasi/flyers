import { Spinner } from "react-bootstrap";
import "./Loading.css";

const Loading = ({ isLoading }) => {
    return (
        <div className={`${isLoading ? "" : "d-none"} loading-container d-flex justify-content-center align-items-center`}>
            <Spinner animation="border" size="xl"/>
        </div>
    )
}

export default Loading;