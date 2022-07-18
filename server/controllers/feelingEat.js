import * as env from "dotenv";
env.config();

import { getAllProperties } from "../database/generalFuncs.js";

export const getFeelingsFromDB = async (req, res) => {
  const feelings = await getAllProperties("feelings");
  res.send(feelings);
};
