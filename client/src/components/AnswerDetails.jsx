import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";

import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import Input from "./Input";
import useNotification from "../hooks/useNotification";

import * as Yup from "yup";

const AnswerDetails = (idI) => {
  const [loading, setLoading] = useState(false);
  const [, setDirty] = useContext(AuthContext);
  const notify = useNotification();
  const navigate = useNavigate();

  const AnswerSchema = Yup.object().shape({
    //check sui dati inseriti nel form
    answer: Yup.string()
      .max(300, "Massimo caratteri superato")
      .required("Required"),
  });
  const handleSubmit = (values) => {
    setLoading(true);
    api
      .sendAnswer(idI.idI, values.answer)
      .then((response) => {
        setDirty(true);
        if (response.status === 200) {
          notify.success(response.message);
        } else {
          response.message.startsWith("Corretto!")
            ? notify.success(response.message)
            : notify.error(response.message);
        }
      })
      .catch((err) => notify.error(err))
      .finally(() => {
        setLoading(false);
        navigate("/", { replace: true });
      });
  };
  return (
    <Formik
      initialValues={{ answer: "" }}
      validationSchema={AnswerSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ touched, isValid }) => {
        const disableSubmit = !touched.answer || !isValid || loading;
        return (
          <Form>
            <Input
              id="answer"
              name="answer"
              type="text"
              placeholder="Inserisci la risposta"
              label="Risposta"
            />
            <Button
              variant={`blue`}
              type="submit"
              className="p-3 rounded-3 my-4 w-100 fw-semibold"
              disabled={disableSubmit}
            >
              {loading && (
                <Spinner
                  animation="grow"
                  size="sm"
                  as="span"
                  role="status"
                  aria-hidden="true"
                  className="me-4"
                />
              )}
              Invia Risposta!
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AnswerDetails;
