"use strict";

const db = require("../db/dbmiddleware");

module.exports = {
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM User WHERE ID = ?";
      db.get(query, [id], (err, row) => {
        if (err) reject({ message: err.message, status: 500 });
        else if (!row) reject({ message: "User not found", status: 404 });
        else resolve({ user: row, status: 200 });
      });
    });
  },

  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM User WHERE Email = ?";
      db.get(query, [email], (err, row) => {
        if (err) reject({ message: err.message, status: 500 });
        else if (!row) reject({ message: "Incorrect email", status: 404 });
        else resolve({ user: row, status: 200 });
      });
    });
  },
  getScores: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT ID,Nome,Cognome,Email,Punteggio FROM User ORDER BY Punteggio DESC LIMIT 3";
      db.all(query, [], (err, rows) => {
        if (err) reject({ message: err.message, status: 500 });
        else if (rows.length === 0)
          reject({ message: "Non sono stati trovati utenti", status: 404 });
        else {
          resolve({ users: rows, status: 200 });
        }
      });
    });
  },

  updateScore: (userID, punti) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE User SET Punteggio = Punteggio+? WHERE ID=?";
      db.run(query, [punti, userID], function (err) {
        if (err) reject({ message: err.message, status: 500 });
        else resolve({ status: 200 });
      });
    });
  },
};
