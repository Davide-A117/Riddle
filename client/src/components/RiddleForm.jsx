import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";

import api from "../services/api";
import useNotification from "../hooks/useNotification";

// Constants
import riddleForm from "../constants/riddleForm";

// Validations
import RiddleSchema from "../validation/RiddleSchema";

// Components
import Input from "./Input";

const RiddleForm = ({ ...props }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notify = useNotification();

  const initialValues = {
    question: "",
    solution: "",
    difficulty: "",
    duration: 0,
    hint1: "",
    hint2: "",
  };

  const handleSubmit = (values) => {
    setLoading(true);
    const riddle = {
      ...values,
    };

    {
      api
        .addRiddle(riddle)
        .then(() => {
          notify.success("Nuovo indovinello inserito");
          navigate(-1, { replace: true });
        })
        .catch((err) => notify.error(err))
        .finally(() => setLoading(false));
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RiddleSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({}) => {
        return (
          <Form>
            {riddleForm.map((input, index) => {
              return (
                <Input
                  key={index}
                  id={input.id}
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  label={input.label}
                  as={input.as}
                  rows={input.rows}
                  options={input.options}
                  max={input.max}
                />
              );
            })}
            <div className="mt-5">
              <Button variant="light" type="reset" className="px-4 me-3">
                Reset
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="px-4 bg-blue"
                // disabled={disabledSubmit}
              >
                {loading && (
                  <Spinner
                    animation="border"
                    size="sm"
                    as="span"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                )}
                Pubblica
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RiddleForm;
