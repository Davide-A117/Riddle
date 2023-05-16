import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const filters = [
  { label: "All", url: "all", protected: 0 },
  { label: "Aperto", url: "aperto", protected: 0 },
  { label: "Chiuso", url: "chiuso", protected: 0 },
  { label: "Pubblicati", url: "pubblicati", protected: 1 },
];
const FilterSection = () => {
  const [session] = useContext(AuthContext);
  const { filter } = useParams();

  if (filter === "pubblicati" && !session.loggedIn)
    return <Navigate to={"/"} replace />;
  else if (!filters.find((item) => item.url === filter)) {
    return <Navigate to={"/not-found"} replace />;
  } else
    return (
      <div>
        <h3 className="d-flex fw-bold text-dark mb-3">
          <FontAwesomeIcon icon={faFilter} className="me-2" />
          Filtri
        </h3>
        <p className="text-muted fw-light mb-3 justify-content-center">
          Filtra Indovinelli
        </p>
        <Nav className="flex-column" variant="pills">
          {filters.map((filter, index) => {
            if (!filter.protected)
              return (
                <NavLink
                  key={index}
                  to={`/riddles/${filter.url}`}
                  className={({ isActive }) =>
                    !isActive
                      ? "p-3 sidebar-item fw-bold p-1 mb-1 rounded-1 text-decoration-none text-black"
                      : "p-3 sidebar-item fw-bold p-1 mb-1 rounded-1 text-decoration-none bg-blue text-white"
                  }
                >
                  {filter.label}
                </NavLink>
              );
            else if (session.loggedIn)
              return (
                <NavLink
                  key={index}
                  to={`/riddles/${filter.url}`}
                  className={({ isActive }) =>
                    !isActive
                      ? "p-3 sidebar-item fw-bold p-1 mb-1 rounded-1 text-decoration-none text-black"
                      : "p-3 sidebar-item fw-bold p-1 mb-1 rounded-1 text-decoration-none bg-blue text-white"
                  }
                >
                  {filter.label}
                </NavLink>
              );
            else return null;
          })}
        </Nav>
      </div>
    );
};
export default FilterSection;
