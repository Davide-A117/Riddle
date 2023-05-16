import { Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Row className="footer">
      <footer className="bg-light text-dark p-4 px-5">
        <div className="d-flex justify-content-between">
          <div className="d-block">
            <h6 className="fw-bold">Copyright &copy; Davide Andriano</h6>
            <h6 className="fw-bold">14 Luglio 2022</h6>
          </div>
          <div className="d-block me-4">
            <h6 className="fw-bold ">Made for Applicazioni Web 1 Exam</h6>
            <a href="https://www.polito.it">Politecnico di Torino</a>
          </div>
        </div>
      </footer>
    </Row>
  );
};

export default Footer;
