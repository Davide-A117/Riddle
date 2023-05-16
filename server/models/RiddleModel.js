"use strict";

const db = require("../db/dbmiddleware");
const dayjs = require("dayjs");

module.exports = {
  getRiddles: () => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT i.ID, u.Nome, u.Cognome, i.Domanda, i.DataFine,i.Difficolta, i.Durata,i.Autore,i.Active,i.Soluzione,i.Suggerimento1, i.Suggerimento2, i.Vincitore, u.Punteggio FROM Indovinello i JOIN User u ON u.ID=i.Autore ";
      db.all(query, [], (err, rows) => {
        if (err) reject({ message: err.message, status: 500 });
        else if (rows.length === 0)
          reject({
            message: "Non sono stati trovati indovinelli",
            status: 404,
          });
        else {
          resolve({ riddles: rows, status: 200 });
        }
      });
    });
  },
  updateEndTime: (idI, durata) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE Indovinello SET DataFine=? WHERE ID=?`;
      db.run(
        query,
        [dayjs().add(durata, "second").format("DD-MM-YYYY HH:mm:ss"), idI],
        (err, row) => {
          if (err) reject({ message: err.message, status: 500 });
          else {
            resolve({ status: 200 });
          }
        }
      );
    });
  },

  updateExpiredOrWin: (idI) => {
    return new Promise((resolve, reject) => {
      // let endDate = dayjs().add(300, "second").format("DD-MM-YYYY HH:mm:ss");
      // resolve(endDate);
      const queryUpdate =
        "UPDATE Indovinello SET Active=?, DataFine=? WHERE ID=?";
      db.run(
        queryUpdate,
        [false, dayjs().format("DD-MM-YYYY HH:mm:ss"), idI],
        (err, row) => {
          if (err) reject({ message: err.message, status: 500 });
          else {
            resolve({ status: 200 });
          }
        }
      );
    });
  },
  updateWinner: (idU, idI) => {
    return new Promise((resolve, reject) => {
      const queryUpdate = "UPDATE Indovinello SET Vincitore=? WHERE ID=?";
      db.run(queryUpdate, [idU, idI], (err, row) => {
        if (err) reject({ message: err.message, status: 500 });
        else {
          resolve({ status: 200 });
        }
      });
    });
  },
  getHour: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT DataFine FROM Indovinello WHERE ID=? AND Active=?";
      db.get(query, [id, true], (err, row) => {
        if (err) reject({ message: err.message, status: 500 });
        else if (row === undefined)
          reject({ message: "Riddle non trovato", status: 404 });
        else {
          resolve({ Hour: row, status: 200 });
        }
      });
    });
  },
  getRiddleByID: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Indovinello WHERE ID=?";
      db.get(query, [id], (err, row) => {
        if (err) reject({ message: err.message, status: 500 });
        else if (row === undefined)
          reject({ message: "Indovinello non trovato", status: 404 });
        else {
          resolve({ riddle: row, status: 200 });
        }
      });
    });
  },

  insertRiddle: (data, autore) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO Indovinello (Domanda,Autore,Difficolta,Durata,Soluzione,Suggerimento1,Suggerimento2,Active,DataFine,Vincitore) VALUES(?,?,?,?,?,?,?,?,?,?)";
      db.run(
        query,
        [
          data.domanda,
          autore,
          data.difficolta,
          data.durata,
          data.soluzione,
          data.suggerimento1,
          data.suggerimento2,
          1,
          null,
          null,
        ],
        (err, row) => {
          if (err) reject({ message: err.message, status: 500 });
          else resolve({ status: 200 });
        }
      );
    });
  },
};
