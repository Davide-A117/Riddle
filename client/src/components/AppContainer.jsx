import { Container } from "react-bootstrap";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppContainer = ({ setRiddles, ...props }) => {
  return (
    <Container fluid className="app-container">
      <Navbar setRiddles={setRiddles} />
      {props.children}
      <Footer />
    </Container>
  );
};

export default AppContainer;
