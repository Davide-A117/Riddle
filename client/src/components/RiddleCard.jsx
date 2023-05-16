import { Col, Card, Button } from "react-bootstrap";
import { faStar, faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
const RiddleCard = ({ riddle, setDirty }) => {
  const [session] = useContext(AuthContext);
  const author = session.user ? session.user.id : null;
  return (
    <Col xs={{ span: 4 }}>
      <Card className="shadow justify-content-center rounded h-100">
        <Card.Header className="py-4">
          <Card.Title className="fw-extrabold" size="sm">
            Autore: {`${riddle.Nome} ${riddle.Cognome}`}
          </Card.Title>

          <Card.Subtitle className="mt-3">
            <h6>
              <span className="me-2">Difficoltà:</span>
              {[...Array(3)].map((item, index) => {
                return index < riddle.Difficolta ? (
                  <FontAwesomeIcon key={index} icon={faStar} size="sm" />
                ) : (
                  <FontAwesomeIcon key={index} icon={faStarEmpty} size="sm" />
                );
              })}
            </h6>
            {riddle.Active ? (
              <h6>
                {`Aperto`}
                <FontAwesomeIcon
                  size="sm"
                  icon={faHourglass1}
                  className="ms-1"
                />
              </h6>
            ) : (
              `Chiuso`
            )}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body className="py-4">
          <Card.Title className="fs-5">{riddle.Domanda}</Card.Title>
        </Card.Body>
        <Card.Footer className="py-4 bg-white border-0">
          <NavLink
            to={
              riddle.Active && riddle.Autore !== author
                ? `/answer-riddle/${riddle.ID}`
                : `/view-answer/${riddle.ID}`
            }
          >
            <div className="d-flex justify-content-center">
              <Button className="px-5" variant="blue">
                {riddle.Active && riddle.Autore !== author
                  ? "Rispondi"
                  : "Visualizza dettagli"}
              </Button>
            </div>
          </NavLink>
        </Card.Footer>
      </Card>
    </Col>
  );
};
export default RiddleCard;
