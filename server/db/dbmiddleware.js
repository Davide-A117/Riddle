"use strict";

const sqlite = require("sqlite3");

// creazione connessione al db

const db = new sqlite.Database("indovinelli.db", (err) => {
  if (err) throw err;
});

module.exports = db;
