const express = require("express");
const authenticate = require("../../authorization/authenticate");

const router = express.Router();
// router for testing authentication
router.get("/secure", authenticate, (req, res) => {
   const authToken = req.headers["x-auth-token"];
    res.json({
    message: "Access granted - Secure route for user ID: " + req.userId,
  });
});

module.exports = router;
