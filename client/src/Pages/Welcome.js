import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../css/welcome.css";

function Welcome(props) {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Click to start your journey!</h1>
      <div className="btns">
        <Button
          onClick={() => navigate("/register")}
          variant="light"
          type="submit"
          className="bg-black"
        >
          Register
        </Button>
        <Button
          className="bg-light text-black"
          onClick={() => navigate("/login")}
          type="submit"
          variant="dark"
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
