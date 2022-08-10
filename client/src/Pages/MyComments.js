import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ".././css/myComments.css";
import Comment from "../components/recipes/comments/Comment";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
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
    // <div>
    <div className="my-comments-container">
      <h1 className="my-comments-title">Edit my comments</h1>
      {myComments.map((comment, idx) => {
        return (
          <div className="my-comments">
            <div>
              <BsFillPencilFill className="edit-comment" />
              <BsTrash className="delete-comment" />

              <div className="comment-component">
                <Comment key={idx} comment={comment} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
    // </div>
  );
}

export default MyComments;
