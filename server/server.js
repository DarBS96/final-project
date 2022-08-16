import * as env from "dotenv";
env.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./client/build")));

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

//Getting all the paths that not configure in server side only in front end side by react router DOM
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => console.log(`server running on port ${port}`));
