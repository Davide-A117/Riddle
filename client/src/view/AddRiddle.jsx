import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

// Components
import RiddleForm from "../components/RiddleForm";

const AddRiddle = () => {
  const navigate = useNavigate();
  return (
    <Row className="p-4 my-4 flex-fill">
      <Col xs={{ span: 10 }} className="mx-auto">
        <Button
          variant="light"
          size="sm"
          className="mb-5 px-4 py-2 rounded-3 bg-beige text-black "
          onClick={() => navigate(-1, { replace: true })}
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            size="lg"
            className="me-3 opacity-25"
          />
          <span className="m-0">Go back</span>
        </Button>
        <h1 className="fw-bold text-dark mb-5">
          Inserisci un nuovo indovinello
        </h1>
        <RiddleForm />
      </Col>
    </Row>
  );
};
export default AddRiddle;
