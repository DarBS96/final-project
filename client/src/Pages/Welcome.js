import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome(props) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to your journey click to start!</h1>
      <button onClick={() => navigate("/register")}>register</button>
    </div>
  );
}

export default Welcome;
