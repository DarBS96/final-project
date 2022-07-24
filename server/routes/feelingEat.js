import express from "express";
const routerFeelingEat = express.Router();
import { getFeelingsFromDB } from "../controllers/feelingEat.js";

import { authenticateToken } from "../middleware/auth.js";

routerFeelingEat.get("/", authenticateToken, getFeelingsFromDB);
export default routerFeelingEat;
