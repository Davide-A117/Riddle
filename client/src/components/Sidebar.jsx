import Classifica from "../components/Classifica";
import FilterSection from "../components/FilterSection";
import { Col } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Col xs={{ span: 3 }} className="mx-auto px-4">
      <FilterSection />
      <Classifica />
    </Col>
  );
};
export default Sidebar;
