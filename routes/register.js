import express from "express";
const routerUserInfo = express.Router();
import { getUserInfo, getUserLoginInfo } from "../controllers/register.js";

routerUserInfo.post("/register", getUserInfo);
routerUserInfo.post("/login", getUserLoginInfo);

export default routerUserInfo;
