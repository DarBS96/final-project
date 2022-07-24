import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function VerifyToken() {
  const token = useSelector((store) => store.registerReducer.token);
  useEffect(() => {
    const sendTokenToServer = async () => {
      try {
        // Send token by header to server
        const data = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_URL}/feelingEat`,
          headers: {
            Authorization: token,
          },
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    sendTokenToServer();
  }, []);

  return <div></div>;
}

export default VerifyToken;
