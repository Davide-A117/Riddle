"use strict";

const db = require("../db/dbmiddleware");

module.exports = {
  insertAnswer: (userID, indovinelloID, risposta) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO Risposte (UserID,IndovinelloID,RispostaFornita) VALUES(?,?,?)";
      db.run(query, [userID, indovinelloID, risposta], (err, row) => {
        if (err) reject({ message: err.message, status: 500 });
        else resolve({ status: 200 });
      });
    });
  },

  getAnswersGivenPerRiddleId: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        "Select Domanda,Soluzione, Vincitore, Active, Autore,DataFine from Indovinello where ID=?",
        [id],
        (err, row) => {
          const info = row;
          if (err) reject({ message: err.message, status: 500 });
          db.all(
            "Select RispostaFornita from Risposte where IndovinelloID=?",
            [id],
            (err, rows) => {
              if (err) reject({ message: err.message, status: 500 });
              let responses = rows;
              if (info.Vincitore) {
                db.get(
                  "Select Nome,Cognome from User Where ID=?",
                  [info.Vincitore],
                  (err, row) => {
                    responses = responses.map((t) => t.RispostaFornita);
                    const result = {
                      Domanda: info.Domanda,
                      DataFine: info.DataFine,
                      Soluzione: info.Soluzione,
                      Autore: info.Autore,
                      Active: info.Active,
                      Vincitore:
                        row.Nome && row.Cognome
                          ? row.Nome + " " + row.Cognome
                          : null,
                      RisposteFornite: responses,
                    };
                    if (err) reject({ message: err.message, status: 500 });
                    else
                      resolve({
                        result: result,
                        status: 200,
                      });
                  }
                );
              } else {
                {
                  responses = responses.map((t) => t.RispostaFornita);
                  const result = {
                    Domanda: info.Domanda,
                    DataFine: info.DataFine,
                    Soluzione: info.Soluzione,
                    Autore: info.Autore,
                    Active: info.Active,
                    Vincitore:
                      "Nessuno ha saputo rispondere al tuo indovinello!",
                    RisposteFornite: responses,
                  };
                  if (err) reject({ message: err.message, status: 500 });
                  else
                    resolve({
                      result: result,
                      status: 200,
                    });
                }
              }
            }
          );
        }
      );
    });
  },
  checkAnswerPerUser: (userID, indovinelloID) => {
    return new Promise((resolve, reject) => {
      db.get(
        "Select * from Risposte where IndovinelloID=? and UserID=?",
        [indovinelloID, userID],
        (err, row) => {
          if (err) reject({ message: err.message, status: 500 });
          else if (row !== undefined) {
            resolve({ message: "Risposta già fornita", status: 409 });
          } else resolve({ status: 200 });
        }
      );
    });
  },

  checkFirstAnswer: (indovinelloID) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Risposte WHERE IndovinelloID=?";
      db.all(query, [indovinelloID], (err, rows) => {
        if (err) reject({ message: err.message, status: 500 });
        else if (rows.length === 0) resolve({ status: 200 });
        else {
          resolve({ status: 409 });
        }
      });
    });
  },
};
