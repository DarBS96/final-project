import express from "express";
const routerUserInfo = express.Router();
import {
  getUserInfo,
  getUserLoginInfo,
  authenticateToken,
  test,
} from "../controllers/register.js";

routerUserInfo.post("/register", getUserInfo);
routerUserInfo.post("/login", getUserLoginInfo);
routerUserInfo.get("/test", authenticateToken, test);

export default routerUserInfo;
