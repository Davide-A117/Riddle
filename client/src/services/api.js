import axios from "axios";
const SERVER_URL = "http://localhost:3001/api/";

const api = {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      axios
        .post(SERVER_URL + "sessions", credentials, { withCredentials: true })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    });
  },

  logout: () => {
    return new Promise((resolve, reject) => {
      axios
        .delete(SERVER_URL + "sessions/current", { withCredentials: true })
        .then(() => resolve())
        .catch((err) => reject(err.response.data));
    });
  },

  getUser: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + "sessions/current", { withCredentials: true })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    });
  },
  getWinners: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + "user/winners", { withCredentials: true })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    });
  },
  getResponsesRiddle: (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + `answers/${id}`, { withCredentials: true })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    });
  },
  addRiddle: (riddle) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          SERVER_URL + `riddle/`,
          {
            domanda: riddle.question,
            difficolta: riddle.difficulty,
            durata: riddle.duration,
            soluzione: riddle.solution,
            suggerimento1: riddle.hint1,
            suggerimento2: riddle.hint2,
          },
          { withCredentials: true }
        )
        .then((res) => resolve(res.message))
        .catch((err) => reject(err.response.data));
    });
  },
  sendAnswer: (id, answer) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          SERVER_URL + `indovinello/${id}/user/`,
          {
            risposta: answer,
          },
          { withCredentials: true }
        )
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    });
  },
  getAllRiddles: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + "riddle/all", { withCredentials: true })
        .then((res) => resolve(res.data))
        .catch((err) =>
          reject({ message: err.response.data, status: err.response.status })
        );
    });
  },
  getRiddle: (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + `riddle/${id}`, { withCredentials: true })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    });
  },
};

export default api;
