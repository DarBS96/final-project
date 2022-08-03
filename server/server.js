import * as env from "dotenv";
env.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

// import { authenticateToken } from "./middleware/auth.js";

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Routers
import routerUserInfo from "./routes/register.js";
import routerFeelingEat from "./routes/feelingEat.js";
import routerRecipes from "./routes/recipes.js";

app.use("/info", routerUserInfo);

//Both routes will start in "feelingEat"
app.use("/feelingEat", routerFeelingEat, routerRecipes);

//Verify token to move on to the next component
app.get("/auth", (req, res, next) => {
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");
    res.send("valid auth token");
  });
});

app.listen(port, () => console.log(`server running on port ${port}`));
