import React, { useState } from "react";
import ".././css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  // const { userRegisterInfo } = useSelector((store) => store.registerReducer);
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
    try {
      //Send user login info to DB
      const data = await axios({
        method: "POST",
        url: "http://localhost:3000/info/login",
        data: isExist,
      });
      console.log(data);
      navigate("/home");
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        setIsExist({ isExist: false, msg: err.response.data.msg });
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="login-form-input"
            type="text"
            placeholder="username"
            name="username"
          />
          <input
            onChange={handleChange}
            className="login-form-input"
            type="password"
            placeholder="password"
            name="password"
          />
          <button className="btn-login">Login</button>
        </form>
        {!isExist.isExist && (
          <div>
            <p>{isExist.msg}</p>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        )}
        {!isExist.validPassword && (
          <div>
            <p>{isExist.msg}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
