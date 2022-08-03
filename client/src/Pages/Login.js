import React, { useState } from "react";
import ".././css/login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveToken, isLogin } from "../Redux/features/registerSlice";
import Button from "react-bootstrap/Button";

function Login(props) {
  // const { userRegisterInfo } = useSelector((store) => store.registerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExist, setIsExist] = useState({
    isExist: true,
    validPassword: true,
    msg: "",
  });

  const handleChange = (e) => {
    setIsExist({
      ...isExist,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // e.preventDefault();
    try {
      //Send user login info to DB
      const data = await axios({
        method: "POST",
        url: "http://localhost:3000/info/login",
        data: { username: isExist.username, password: isExist.password },
      });
      //Getting the token from the server
      const { token } = data.data;
      dispatch(saveToken(token));
      dispatch(isLogin());
      navigate("/home");
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        setIsExist({ ...isExist, isExist: false, msg: err.response.data.msg });
      } else if (err.response.status === 401) {
        setIsExist({
          ...isExist,
          validPassword: false,
          msg: err.response.data.msg,
        });
      }
    }
  };

  return (
    <div>
      <div className="login-container">
        <h1 className="login-title">Good to see you :)</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="inputs-container">
            <input
              onChange={handleChange}
              className="login-form-input"
              type="text"
              placeholder="username"
              name="username"
              required
            />
            <input
              onChange={handleChange}
              className="login-form-input"
              type="password"
              placeholder="password"
              name="password"
              required
            />
          </div>
          <Button type="submit" className="btn" variant="dark ">
            Login
          </Button>
        </form>
        <Link style={{ color: "black" }} to={"/register"}>
          Not registered yet? sign up!
        </Link>
      </div>
      {!isExist.isExist && (
        <div style={{ marginTop: "20px" }}>
          <p>{isExist.msg}</p>
        </div>
      )}
      {!isExist.validPassword && (
        <div style={{ marginTop: "20px" }}>
          <p>{isExist.msg}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
