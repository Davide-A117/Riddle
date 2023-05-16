import { useEffect, useState, useContext } from "react";
import { Row, Button, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  faArrowCircleLeft,
  faHourglass1,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

const ViewDetails = () => {
  const [loaded, setLoaded] = useState(false);
  const [session] = useContext(AuthContext);
  const [riddleValues, setRiddle] = useState();
  const [, setError] = useState({});
  const { answerId } = useParams();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const moment = require("moment");
  const [dirty, setDirty] = useState(true);
  useEffect(() => {
    api
      .getResponsesRiddle(answerId)
      .then((riddle) => {
        setError({});
        const riddleValues = {
          ...riddle,
        };
        setRiddle(riddleValues);
        setLoaded(true);
        setDirty(false);
        if (
          riddleValues.Active &&
          session.user &&
          session.user.id === riddleValues.Autore
        ) {
          setIsActive(true);
          if (riddleValues.DataFine) {
            setSeconds(evaluateSeconds());
          }
        }
      })
      .catch((err) => {
        setError({ show: true, ...err });
      });
  }, [answerId, dirty]); // eslint-disable-line react-hooks/exhaustive-deps

  function reset() {
    setSeconds(null);
    setIsActive(false);
    setDirty(false);
  }
  function evaluateSeconds() {
    if (riddleValues.DataFine && loaded) {
      const date1 = moment(riddleValues.DataFine, "DD-MM-YYYY hh:mm:ss");
      const date2 = moment();
      return parseInt(date1.diff(date2) / 1000);
    }
  }
  useEffect(() => {
    let timer = null;
    if (isActive) {
      setSeconds(evaluateSeconds());
      timer = setInterval(() => {
        setSeconds(evaluateSeconds());
        setDirty(true);
        if (seconds <= 1) {
          reset();
        }
      }, 1000);
    } else if (!isActive) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]); // eslint-disable-line react-hooks/exhaustive-deps
  if (loaded) {
    return (
      <Row className="p-4 my-4 flex-fill">
        <Col xs={{ span: 10 }} className="mx-auto">
          <div className="d-flex justify-content-end">
            {session.user &&
            riddleValues.Active &&
            riddleValues.Autore === session.user.id ? (
              <div>
                {riddleValues.DataFine ? (
                  isActive && riddleValues.Active ? (
                    <h5 className="text-danger">
                      Tempo rimanente: {seconds} secondi
                      <FontAwesomeIcon
                        size="sm"
                        icon={faHourglass1}
                        className="ms-2"
                      />
                    </h5>
                  ) : null
                ) : (
                  <h5 className="text-danger">
                    Tempo rimanente: Non ancora avviato
                  </h5>
                )}
              </div>
            ) : (
              <h5 className="text-danger">Chiuso</h5>
            )}
          </div>
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
          <h2 className="text-bold text-danger ">Domanda:</h2>
          <h3 className="mt-1">{`${riddleValues.Domanda}`}</h3>

          {!riddleValues.Active ? (
            <div className="mt-3 d-flex">
              <h3 className="mt-4 mb-3 text-danger">Soluzione: </h3>
              <h3 className="ms-2 mt-4 mb-3 ">{`${riddleValues.Soluzione}`}</h3>
            </div>
          ) : null}
          {!riddleValues.Active ? (
            <div className="mt-3 d-flex">
              <h3 className="mt-1 text-danger">Vincitore: </h3>
              <h3 className="ms-2 mt-1">
                {riddleValues.Autore === session.user.id || session.user
                  ? `${riddleValues.Vincitore}`
                  : "Nessuno ha saputo rispondere all'indovinello"}
              </h3>
            </div>
          ) : null}
          <ListGroup variant="flush" className="mt-3">
            <ListGroup.Item className="mt-4 fw-extrabold fs-2">
              Risposte Fornite Dagli Utenti:
            </ListGroup.Item>
            {riddleValues.RisposteFornite.map((response, index) => {
              return (
                <ListGroup.Item
                  className=" text-secondary fs-3 text-bold"
                  key={index}
                >
                  {response}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
};
export default ViewDetails;
