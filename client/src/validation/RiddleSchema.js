import * as Yup from "yup";

// Constants
import riddleForm from "../constants/riddleForm";

const question = riddleForm.find((input) => {
  return input.name === "question";
});

const solution = riddleForm.find((input) => {
  return input.name === "solution";
});

const RiddleSchema = Yup.object().shape({
  question: Yup.string()
    .max(question.max, "Inserisci un indovinello più corto")
    .required("Required"),
  solution: Yup.string().max(solution.max, "Inserisci una soluzione più corta").required(),
  difficulty: Yup.string().required("Required"),
  duration: Yup.number()
    .min(30, "Il minimo inseribile è 30 secondi")
    .max(600, "Il massimo inseribile è 600 secondi").required(),
  hint1: Yup.string().max(solution.max, "Inserisci una suggerimento più corto").required(),
  hint2: Yup.string().max(solution.max, "Inserisci un suggerimento più corto").required(),
});

export default RiddleSchema;
