import * as env from "dotenv";
env.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

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
import App from "../client/src/App.js";
// import routerAuth from "./routes/authToken.js";

//routes
// app.use("/auth", routerAuth);

app.use("/info", routerUserInfo);

//Both routes will start in "feelingEat"
app.use("/feelingEat", routerFeelingEat, routerRecipes);

//Verify token to move on to the next component
app.get("/auth", (req, res) => {
  res.send("valid auth");
});

app.listen(port, () => console.log(`server running on port ${port}`));
