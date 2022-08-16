import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // console.log("err =>", err);
    // console.log(decoded);
    if (err) return res.status(403).send("Token no longer valid");
    next();
    // return decoded;
  });
};
