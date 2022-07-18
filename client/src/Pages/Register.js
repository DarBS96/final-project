import React, { useState } from "react";
import ".././css/register.css";
// import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  getRegisterInfo,
  restartRegisterInfo,
} from "../Redux/features/registerSlice";

function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userRegisterInfo } = useSelector((store) => store.registerReducer);

  const [isExist, setIsExist] = useState({
    isExist: false,
    msg: "",
  });

  const handleChange = (e) => {
    dispatch(
      getRegisterInfo({
        ...userRegisterInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Send userInfo to DB
      const sendUserInfoToDB = await axios({
        method: "POST",
        url: "http://localhost:3000/info/register",
        data: userRegisterInfo,
      });
      navigate("/login");
    } catch (err) {
      if (err.response.status === 409) {
        setIsExist({ isExist: true, msg: err.response.data.msg });
      }
      dispatch(restartRegisterInfo());
    }
  };
  const { first_name, last_name, username, email, password } = userRegisterInfo;

  return (
    <div>
      <h1>Good to see you</h1>
      <form onSubmit={handleSubmit} className="register-container">
        <input
          // required
          onChange={handleChange}
          className="register-form-input"
          type="text"
          placeholder="First Name"
          name="first_name"
          value={first_name}
        />
        <input
          // required
          onChange={handleChange}
          className="register-form-input"
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={last_name}
        />
        <input
          // required
          onChange={handleChange}
          className="register-form-input"
          type="text"
          placeholder="username"
          name="username"
          value={username}
        />
        <input
          // required
          onChange={handleChange}
          className="register-form-input"
          type="email"
          placeholder="email"
          name="email"
          value={email}
        />
        <input
          // required
          onChange={handleChange}
          className="register-form-input"
          type="password"
          placeholder="password"
          name="password"
          value={password}
        />
        <button className="btn-register">Register</button>
      </form>
      {isExist.isExist && <p>{isExist.msg}</p>}
      <Link to={"/login"}>Already registered? sign in!</Link>
    </div>
  );
}

export default Register;
