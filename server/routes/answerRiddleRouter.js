"use strict";

const express = require("express");
const router = express.Router();
const { check, param, validationResult } = require("express-validator");
const answerModel = require("../models/AnswerRiddle");
const userModel = require("../models/UserModel");
const riddleModel = require("../models/RiddleModel");
const withAuth = require("../middlewares/withAuth");
router.post(
  "/indovinello/:idI/user/",
  [
    param("idI").notEmpty().isInt({ min: 1 }).not().equals(null),
    check("risposta").isString(),
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
    let timer = (idI, durata) => {
      setTimeout(() => {
        riddleModel
          .updateExpiredOrWin(idI)
          .then(() => {
            clearTimeout(timer);
            //return res.status(200).end();
          })
          .catch((err) => {
            clearTimeout(timer);
            //return res.status(500).json(err.message);
          });
      }, (durata - 1) * 1000);
    };
    answerModel
      .checkFirstAnswer(req.params.idI)
      .then((data) => {
        if (data.status === 200) {
          riddleModel
            .getRiddleByID(req.params.idI)
            .then((result) => {
              riddleModel
                .updateEndTime(req.params.idI, result.riddle.Durata)
                .then(() => {
                  timer(req.params.idI, result.riddle.Durata);
                })
                .catch((err) => {
                  return res.end();
                });
            })
            .catch((err) => {
              if (err.status === 500) return res.end();
            });
        }
        answerModel
          .checkAnswerPerUser(req.user.id, req.params.idI)
          .then((response) => {
            if (response.status === 200) {
              answerModel
                .insertAnswer(req.user.id, req.params.idI, req.body.risposta)
                .then(() => {
                  riddleModel
                    .getRiddleByID(req.params.idI)
                    .then((result) => {
                      if (
                        result.riddle.Soluzione.toLowerCase() ===
                        req.body.risposta.toLowerCase()
                      ) {
                        riddleModel
                          .updateExpiredOrWin(req.params.idI)
                          .then(() => {
                            riddleModel
                              .updateWinner(req.user.id, req.params.idI)
                              .then(() => {
                                userModel
                                  .updateScore(
                                    req.user.id,
                                    result.riddle.Difficolta
                                  )
                                  .then(() => {
                                    return res.status(200).json({
                                      message: `Corretto! Hai guadagnato ${result.riddle.Difficolta} punti!`,
                                    });
                                  })
                                  .catch((err) => {
                                    return res.status(500).json(err.message);
                                  });
                              })
                              .catch((err) => {
                                return res.status(500).json(err.message);
                              });
                          })
                          .catch((err) => {
                            return res.status(500).json(err.message);
                          });
                      } else
                        return res
                          .status(200)
                          .json({ message: "Risposta Errata!" });
                    })
                    .catch((err) => {
                      return res.status(500).json(err.message);
                    });
                })
                .catch((err) => res.status(500).json(err.message));
            } else {
              return res.status(response.status).json(response.message);
            }
          })
          .catch((err) => {
            return res.status(500).json(err.message);
          });
      })
      .catch((err) => {
        res.status(err.status).json(err.message);
      });
  }
);
router.get(
  "/answers/:id",
  [param("id").notEmpty().isInt({ min: 1 }).not().equals(null)],
  withAuth,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: "Request Format Incorrect" });
    }
    next();
  },
  (req, res) => {
    answerModel
      .getAnswersGivenPerRiddleId(req.params.id)
      .then((data) => {
        return res.status(data.status).json(data.result);
      })
      .catch((data) => res.status(data.status).json(data.message));
  }
);
module.exports = router;
