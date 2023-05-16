import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../contexts/AuthContext";
const Login = () => {
  const [session] = useContext(AuthContext);

  if (session.loggedIn) {
    return <Navigate to={"/riddles/all"} replace />;
  } else
    return (
      <Row expand="lg" className="flex-fill align-items-center">
        <div className="text-center">
          <h1 className="fw-extrabold text-black text-center">
            Benvenuto in PoliRiddle
          </h1>
          <h4 className="text-black text-center">
            Esegui il Login per cominciare a giocare!
          </h4>
        </div>
        <Col xs={8} className="mx-auto">
          <h2 className="text-center">Login</h2>
          <LoginForm />
        </Col>
      </Row>
    );
};

export default Login;
