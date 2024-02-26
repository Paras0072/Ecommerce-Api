const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authToken = req.headers["x-auth-token"];
   const token = req.header('x-auth-token');
   console.log(token)
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
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
