import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Navbar as BSNavbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Components

import api from "../services/api";
import useNotification from "../hooks/useNotification";

const Navbar = ({ setRiddles }) => {
  const [session, setSession] = useContext(AuthContext);
  const navigate = useNavigate();
  const notify = useNotification();
  const handleLogout = () => {
    api
      .logout()
      .then(() => {
        notify.success("Alla prossima!");
        setSession({ user: undefined, loggedIn: false });
        setRiddles([]);
        navigate("/", { replace: true });
      })
      .catch((err) => notify.error(err));
  };

  return (
    <Row>
      <BSNavbar bg="blue" variant="light" expand="lg">
        <Container fluid>
          <BSNavbar.Brand className="fs-1 fw-black text-pink">
            <Link to={"/"} replace className="text-decoration-none text-pink">
              <div className="d-flex align-items-baseline">
                PoliRiddle
                <FontAwesomeIcon icon={faQuestion} size="lg" className="ms-3" />
              </div>
            </Link>
          </BSNavbar.Brand>

          <div className="d-flex align-items-baseline">
            <h6 className="text-pink fw-light">
              <FontAwesomeIcon icon={faUser} size="lg" className="me-3" />
              Ciao, {session.user ? session.user.name : "Utente"} !
            </h6>
            <Link to="/riddles/all" replace>
              <Button
                variant="beige"
                size="sm"
                className="ms-4 px-3 text-white fw-semibold"
              >
                Indovinelli
              </Button>
            </Link>

            {session.loggedIn ? (
              <Button
                variant="beige"
                size="sm"
                className="ms-4 px-3 text-white fw-semibold"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/" replace>
                <Button
                  variant="beige"
                  size="sm"
                  className="ms-4 px-3 text-white fw-semibold"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </BSNavbar>
    </Row>
  );
};

export default Navbar;
