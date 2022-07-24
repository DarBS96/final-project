import * as env from "dotenv";
env.config();

import { getAllProperties, pushAnyInfoToDB } from "../database/generalFuncs.js";

export const getFeelingsFromDB = async (req, res) => {
  const feelings = await getAllProperties("feelings");
  res.send(feelings);
};

export const pushUserPreferencesToDB = async (req, res) => {
  const feelings = await getAllProperties("feelings");
};
