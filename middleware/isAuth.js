const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No Token" });
  }
};

module.exports = isAuth;
