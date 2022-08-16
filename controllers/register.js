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
      email: email.toLowerCase(),
    })
      .then((response) => response)
      .catch((err) => console.log(err.message));
    res.status(200).json({ msg: `You have been registered successfully! 😀` });
  }
};

export const getUserLoginInfo = async (req, res) => {
  const { username, password } = req.body;
  //Check if username exist
  const usernameIsExist = await checkIfExist("users", { username });
  if (!usernameIsExist) {
    res.status(404).json({ msg: "Sorry you have to register first!" });
  } else {
    //Compare password
    const hashedPassword = await getProperty("users", "password", {
      username,
    });
    const verifyPassword = bcrypt.compareSync(
      password,
      hashedPassword[0].password
    );
    //Give a token to the user after password has been verified
    if (verifyPassword) {
      const userInfo = await getProperty("users", "user_id", { username });
      const userId = userInfo[0].user_id;

      //create token
      const token = jwt.sign(
        { userId, username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      // send token to the browser by cookie - not working
      res.cookie("token", "token", {
        httpOnly: true,
      });
      //Send back the token
      res.send({ token });
    } else {
      res.status(401).send({ msg: "Invalid password" });
    }
  }
};
