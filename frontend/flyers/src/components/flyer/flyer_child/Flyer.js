import { Card, Col } from "react-bootstrap";

const Flyer = ({ flyer, onSaveFlyer, isSaved }) => {
    return (
        <Col xs={6} md={3} className="py-2 d-flex">
            <Card>
                <img src={flyer.imgSrc} className="mh-100 mw-100 m-auto" alt="" />
                <div className="d-flex flex-column">
                    <Card.Subtitle style={{ fontSize: "0.9rem", "minHeight": "3vh" }} className="text-uppercase text-muted ms-3 mt-2">{flyer.retailer}</Card.Subtitle>
                    <Card.Title style={{ fontSize: "1.2rem", "minHeight": "7vh" }} className="ms-3 mt-auto">{flyer.title}</Card.Title>
                    <span className="mb-0 ms-3" style={{ fontSize: "0.9rem" }}>{flyer.category}</span>
                    <i className={`bi bi-heart-fill ${isSaved ? "text-primary" : "text-muted"} ms-3 my-1`} onClick={() => onSaveFlyer()} />
                </div>
            </Card>
        </Col>
    )
}

export default Flyer;