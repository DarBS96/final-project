import React, { useEffect } from "react";
import FeelingsList from "../components/feelings/FeelingsList";
import VerifyToken from "../components/VerifyToken";
function Home(props) {
  return (
    <div>
      <VerifyToken>
        <FeelingsList />
      </VerifyToken>
    </div>
  );
}

export default Home;
