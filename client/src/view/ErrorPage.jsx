import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
const pageNotFoundError = {
  status: 404,
  statusText: "Page Not Found",
  message: "La pagina richiesta non è stata trovata.",
};
const ErrorView = () => {
  return (
    <Row className="p-4 my-4 mx-auto flex-fill text-dark align-items-center">
      <div className="d-flex flex-column align-items-center">
        <FontAwesomeIcon icon={faFaceFrown} size={"8x"} className={"my-5"} />
        <h1 className="mb-0 fw-bold">{pageNotFoundError.status}</h1>
        <h3 className="mb-0 fw-bold">{pageNotFoundError.statusText}</h3>
        <small>{pageNotFoundError.message}</small>
        <div className="my-5">
          <Link to={"/"}>
            <Button size="xs bg-blue">Torna indietro</Button>
          </Link>
        </div>
      </div>
    </Row>
  );
};

export default ErrorView;
