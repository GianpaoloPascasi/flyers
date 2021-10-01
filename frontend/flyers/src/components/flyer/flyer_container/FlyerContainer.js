import { Row, Container } from "react-bootstrap";
import Flyer from "../flyer_child/Flyer";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import "../../../App.css";

const FlyerContainer = ({ flyers, sevedFlyers, onSaveFlyer, onCanLazyLoadFlyers }) => {

    useEffect(() => {
        return () => {
            debouncedScrollHandler.cancel();
        }
    }, []);

    const debouncedScrollHandler = useMemo(() => debounce(onCanLazyLoadFlyers, 250), []);

    return (
        <Container fluid={true} onScroll={debouncedScrollHandler} className={`py-2 mh-90-vh overflow-auto`}>
            <Row>
                {
                    //filtra i volantini visibili
                    flyers.filter(flyer => flyer.is_published === 1).map(flyer => <Flyer flyer={flyer} key={`flyer_main_item_${flyer.id}`} isSaved={sevedFlyers.find(e => e.id === flyer.id)} onSaveFlyer={() => onSaveFlyer(flyer)} />)
                }
            </Row>
        </Container>
    )
}

export default FlyerContainer;