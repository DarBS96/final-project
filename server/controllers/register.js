import bcrypt from "bcrypt";
import * as env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

import {
  pushUserInfoToDB,
  checkIfExist,
  getProperty,
} from "../database/generalFuncs.js";

export const getUserInfo = async (req, res) => {
  const { first_name, last_name, username, password, email } = req.body;

  //encrypt password
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt, (err) => {
    console.log(err.message);
  });

  //check if user already exists
  const usernameIsExist = await checkIfExist("users", { username });
  const emailExist = await checkIfExist("users", { email });
  if (usernameIsExist) {
    res.status(409).json({
      msg: `The username '${username}' is already taken! Please choose a different one! ⛔`,
    });
    return;
  } else if (emailExist) {
    res.status(409).json({
      msg: `The email '${email}' is already taken! Please choose a different one! ⛔`,
    });
    return;
  } else {
    pushUserInfoToDB("users", {
      first_name,
      last_name,
      username,
      password: hash,
      email,
    })
      .then((response) => response)
      .catch((err) => console.log(err.message));
    res.status(200).json({ msg: `You have been registered successfully! 😀` });
    return;
  }
};

export const getUserLoginInfo = async (req, res) => {
  const { username, password } = req.body;
  //Check if username exist
  const usernameIsExist = await checkIfExist("users", { username });
  if (!usernameIsExist)
    res.status(404).json({ msg: "Sorry you have to register first!" });

  //Compare password
  const hashedPassword = await getProperty("users", "password", { username });
  const verifyPassword = bcrypt.compareSync(
    password,
    hashedPassword[0].password
  );

  //Give a token to the user after password has been verified
  if (verifyPassword) {
    const userInfo = await getProperty("users", "user_id", { username });
    const userId = userInfo[0].user_id;

    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.json({ auth: true, token });
  } else {
    res.status(401).send({ msg: "Invalid password" });
  }
};

//Test token
export const test = (req, res) => {
  res.json({ auth: true });
};

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  // console.log(token);
  // console.log(process.env.ACCESS_TOKEN_SECRET);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // console.log("err =>", err);
    // console.log("decoded =>", decoded);
    if (err) return res.status(403).send("Token no longer valid");
    next();
  });
};
