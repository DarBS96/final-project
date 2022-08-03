import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../css/welcome.css";

function Welcome(props) {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="login-title">Click to start your journey!</h1>
      <div className="btns">
        <Button
          className="btn"
          onClick={() => navigate("/register")}
          variant="light"
        >
          Register
        </Button>
        <Button
          onClick={() => navigate("/login")}
          type="submit"
          className="btn"
          variant="dark "
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
