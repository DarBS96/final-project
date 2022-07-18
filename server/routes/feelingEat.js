import express from "express";
const routerFeelingEat = express.Router();
import { getFeelingsFromDB } from "../controllers/feelingEat.js";

routerFeelingEat.get("/", getFeelingsFromDB);
export default routerFeelingEat;
