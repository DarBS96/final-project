import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyToken({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((store) => store.registerReducer.token);
  useEffect(() => {
    const sendTokenToServer = async () => {
      try {
        // Send token by header to server
        const data = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_URL}/auth`,
          headers: {
            Authorization: token,
          },
        });
        if (data.status === 200) setIsAuth(true);
      } catch (err) {
        console.log(err);
        setIsAuth(false);
        navigate("/login");
      }
    };
    sendTokenToServer();
  }, []);

  return isAuth ? children : null;
}

export default VerifyToken;
