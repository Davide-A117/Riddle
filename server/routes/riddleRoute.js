"use strict";

const express = require("express");
const router = express.Router();
const { check, param, validationResult } = require("express-validator");
const riddleModel = require("../models/RiddleModel");
const dayjs = require("dayjs");
const withAuth = require("../middlewares/withAuth");

router.get("/all", (req, res) => {
  riddleModel
    .getRiddles()
    .then((data) => {
      return res.status(data.status).json(data.riddles);
    })
    .catch((err) => {
      return res.status(err.status).json(err.message);
    });
});

router.get(
  "/:id",
  [param("id").notEmpty().isInt({ min: 1 })],
  withAuth,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: "Request Format Incorrect" });
    }
    next();
  },
  (req, res) => {
    riddleModel
      .getRiddleByID(req.params.id)
      .then((data) => {
        return res.status(data.status).json(data.riddle);
      })
      .catch((error) => {
        return res.status(data.status).json(data.message);
      });
  }
);
router.post(
  "/",
  [
    check("domanda").notEmpty().isString().not().equals(null),
    check("difficolta").not().equals(null).notEmpty().isInt({ min: 1, max: 3 }),
    check("durata").not().equals(null).notEmpty().isInt({ min: 30, max: 600 }),
    check("soluzione").notEmpty().isString().not().equals(null),
    check("suggerimento1").notEmpty().isString().not().equals(null),
    check("suggerimento2").notEmpty().isString().not().equals(null),
  ],
  withAuth,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: "Request Format Incorrect" });
    }
    next();
  },
  (req, res) => {
    riddleModel
      .insertRiddle(req.body, req.user.id)
      .then((data) => res.status(data.status).end())
      .catch((err) => res.status(err.status).json(err.message));
  }
);
module.exports = router;
