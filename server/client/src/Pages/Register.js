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
import Button from "react-bootstrap/Button";

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
        url: `${process.env.REACT_APP_URL}/info/register`,
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
      <h1 className="register-title">Let's start FeelEat!</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="inputs-register-container">
          <input
            onChange={handleChange}
            className="register-form-input"
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
            required
          />
          <input
            onChange={handleChange}
            className="register-form-input"
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            required
          />
          <input
            required
            onChange={handleChange}
            className="register-form-input"
            type="text"
            placeholder="username"
            name="username"
            value={username}
          />
          <input
            onChange={handleChange}
            className="register-form-input"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            required
          />
          <input
            onChange={handleChange}
            className="register-form-input"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            required
          />
        </div>
        <Button type="submit" className="btn-register" variant="light ">
          Register
        </Button>
      </form>
      {isExist.isExist && <p>{isExist.msg}</p>}
      <Link style={{ color: "black" }} to={"/login"}>
        Already registered? sign in!
      </Link>
    </div>
  );
}

export default Register;
