import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import api from "../services/api";

const Classifica = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [, setError] = useState({});
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    if (dirty) {
      api
        .getWinners()
        .then((winners) => {
          setTopUsers(winners);
          setDirty(false);
        })
        .catch((err) => {
          err.status === 404 && setTopUsers([]);
          err.status === 500 && setError({ show: true, ...err });
        });
    }
  }, [dirty]);
  return (
    <div>
      <h3 className="d-flex fw-bold text-dark mb-3 mt-5">
        <FontAwesomeIcon icon={faTrophy} className="me-2" />
        Classifica
      </h3>

      <div className="mt-3 px-4">
        {topUsers.map((user, index) => {
          return (
            <div
              key={index}
              className="d-flex fw-extrabold justify-content-between"
            >
              <h5>
                {user.Nome} {user.Cognome}
              </h5>
              <h5>{user.Punteggio}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classifica;
