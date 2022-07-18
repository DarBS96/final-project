import * as env from "dotenv";
env.config();
import cors from "cors";
import express from "express";

//Routers
import routerUserInfo from "./routes/register.js";
import routerFeelingEat from "./routes/feelingEat.js";

const port = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/info", routerUserInfo);
app.use("/feelingEat", routerFeelingEat);
app.listen(port, () => console.log(`server running on port ${port}`));

app.get("/", (req, res) => {
  res.json("hello");
});
