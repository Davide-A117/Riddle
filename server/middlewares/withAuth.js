"use strict";

//utilizzato per fare il check dell'autenticazione

const withAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json("Not authenticated");
};

module.exports = withAuth;
