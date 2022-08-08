import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/myComments`;

function MyComments(props) {
  const token = useSelector((store) => store.registerReducer.token);
  const [myComments, setMyComments] = useState([]);

  useEffect(() => {
    const getMyComments = async () => {
      const data = await axios({
        method: "GET",
        url: `${URL}`,
        headers: {
          Authorization: token,
        },
      });

      setMyComments(data.data);
    };
    getMyComments();
  }, []);
  return (
    <div>
      <h1>Edit my comments</h1>
      {myComments.map((comment, idx) => {
        return (
          <div>
            <h1> {comment.comment_title}</h1>
            <p>{comment.comment_body}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MyComments;
