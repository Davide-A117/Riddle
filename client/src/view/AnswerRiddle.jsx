import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import {
  faHourglass1,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnswerDetails from "../components/AnswerDetails";
import useNotification from "../hooks/useNotification";

const AnswerRiddle = () => {
  const moment = require("moment");
  const [loaded, setLoaded] = useState(false);
  const [riddleValues, setRiddle] = useState();
  const [, setError] = useState({});
  const { answerId } = useParams();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const notify = useNotification();

  function reset() {
    setSeconds(null);
    setIsActive(false);
  }

  useEffect(() => {
    api
      .getRiddle(answerId)
      .then((riddle) => {
        setError({});
        const riddleValues = {
          ...riddle,
        };
        setRiddle(riddleValues);
        setLoaded(true);
        setIsActive(true);
      })
      .catch((err) => {
        setError({ show: true, ...err });
      });
  }, [answerId]);

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

        if (seconds === 0) {
          setRiddle({});
          reset();
          navigate(-1, { replace: true });
          notify.error(`Il tempo per poter rispondere è scaduto!`);
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
            {riddleValues.Active ? (
              <div>
                {riddleValues.DataFine ? (
                  <h5>
                    Tempo rimanente: {seconds} secondi
                    <FontAwesomeIcon
                      size="sm"
                      icon={faHourglass1}
                      className="ms-2"
                    />
                  </h5>
                ) : (
                  <h5>
                    Inserisci la prima risposta per cominciare il conto alla
                    rovescia!
                  </h5>
                )}
              </div>
            ) : null}
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
          {isActive &&
          riddleValues.Active &&
          seconds < riddleValues.Durata / 2 ? (
            <h5 className="mt-5 mb-5">
              Suggerimento: {`${riddleValues.Suggerimento1}`}
            </h5>
          ) : null}
          {isActive &&
          riddleValues.Active &&
          seconds < riddleValues.Durata / 4 ? (
            <h5 className="mt-5 mb-5">
              Altro Suggerimento: {`${riddleValues.Suggerimento2}`}
            </h5>
          ) : null}
          <AnswerDetails idI={answerId} />
        </Col>
      </Row>
    );
  }
};
export default AnswerRiddle;
