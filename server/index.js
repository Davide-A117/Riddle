"use strict";

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const usersModel = require("./models/UserModel");
const sessionsRouter = require("./routes/sessions");
const userRouter = require("./routes/userRoute");
const riddleRouter = require("./routes/riddleRoute");
const answerRouter = require("./routes/answerRiddleRouter");

passport.use(
  new LocalStrategy(function (username, password, done) {
    usersModel
      .getUserByEmail(username)
      .then((res) => {
        crypto.scrypt(
          password,
          res.user.Salt,
          32,
          function (err, hashedPassword) {
            if (err) return done({ message: "Error with crypto", status: 500 });

            const passwordHex = Buffer.from(res.user.Password, "hex");

            if (!crypto.timingSafeEqual(passwordHex, hashedPassword)) {
              return done({
                message: "Email e/o Password sbagliata",
                status: 401,
              });
            }
            return done(null, {
              id: res.user.ID,
              email: res.user.Email,
              name: res.user.Nome,
            });
          }
        );
      })
      .catch((err) => {
        if (err.status === 404) {
          return done({ message: "Email e/o Password sbagliata", status: 401 });
        }
        return done(err);
      });
  })
);

// init express
const app = new express();
const port = 3001;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  usersModel
    .getUserById(id)
    .then((res) => {
      done(null, {
        id: res.user.ID,
        email: res.user.Email,
        name: res.user.Nome,
      });
    })
    .catch((err) => {
      done(err, null);
    });
});

app.use(
  session({
    secret:
      "a secret sentence not to share with anybody and anywhere, userd to sign the session ID cookie",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Set-up middlewares
app.use(logger("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

//API
app.use("/api/sessions", sessionsRouter);
app.use("/api/user", userRouter);
app.use("/api/riddle", riddleRouter);
app.use("/api/", answerRouter);
// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
