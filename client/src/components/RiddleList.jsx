import { Row, Col, Button } from "react-bootstrap";
import RiddleCard from "../components/RiddleCard";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const RiddleList = ({ riddles, setDirty }) => {
  const [session] = useContext(AuthContext);

  return (
    <Col xs={{ span: 9 }} className="mx-auto">
      {session.loggedIn ? (
        <div className="mb-3 d-flex justify-content-end">
          <Link to="/add-riddle">
            <Button
              variant="blue"
              size="sm"
              className="fw-bold m px-3 h-100 rounded-3"
            >
              <FontAwesomeIcon icon={faCirclePlus} size="lg" className="me-3" />
              Aggiungi Indovinello
            </Button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <Row>
        {riddles.length === 0 ? (
          <h5 className="my-5 text-dark">
            Non sono stati trovati indovinelli, pubblicane uno!
          </h5>
        ) : (
          riddles.map((riddle, index) => {
            return (
              <RiddleCard key={index} riddle={riddle} setDirty={setDirty} />
            );
          })
        )}
      </Row>
    </Col>
  );
};
export default RiddleList;
