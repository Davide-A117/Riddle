const filmForm = [
  {
    id: "add-riddle-question",
    label: "Domanda",
    name: "question",
    type: "text",
    as: "textarea",
    rows: 5,
    placeholder: "Inserisci la domanda",
    max: 500,
  },
  {
    id: "add-riddle-solution",
    label: "Soluzione",
    name: "solution",
    type: "text",
    as: "textarea",
    rows: 3,
    placeholder: "Qual è la soluzione?",
    max: 200,
  },
  {
    id: "add-riddle-difficulty",
    label: "Difficoltà",
    name: "difficulty",
    as: "select",
    options: [
      { value: "", label: "Choose a difficulty" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ],
  },
  {
    id: "add-riddle-duration",
    label: "Durata",
    name: "duration",
    type: "text",
    placeholder: "Inserisci la durata in secondi",
  },

  {
    label: "Primo Indizio",
    id: "add-riddle-first-hint",
    name: "hint1",
    type: "text",
    as: "textarea",
    rows: 2,
    placeholder: "Inserisci il primo indizio",
    max: 200,
  },
  {
    label: "Secondo Indizio",
    id: "add-riddle-second-hint",
    name: "hint2",
    type: "text",
    as: "textarea",
    rows: 2,
    placeholder: "Inserisci il secondo indizio",
    max: 200,
  },
];

export default filmForm;
