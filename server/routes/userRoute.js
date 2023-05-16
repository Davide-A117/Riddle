"use strict";

const express = require("express");
const router = express.Router();
const userModel = require("../models/UserModel");
router.get("/winners", (req, res) => {
  userModel.getScores().then((data) => {
    res.status(200).json(data.users);
  });
});
module.exports = router;
