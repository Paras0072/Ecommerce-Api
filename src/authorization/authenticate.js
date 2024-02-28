const jwt = require("jsonwebtoken");
// function for getting token
require("dotenv").config();
function authenticate(req, res, next) {
   const token = req.headers["x-auth-token"];
   console.log(token)
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token( Add the key : x-auth-token  value: generated token from login  in headers of request then Try Again!!" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

module.exports = authenticate;
