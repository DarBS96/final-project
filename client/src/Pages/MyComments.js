import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ".././css/myComments.css";
import Comment from "../components/recipes/comments/Comment";
import UpdateComment from "../components/recipes/comments/UpdateComment";
import {
  getComments,
  setSelectedComment,
  setEditDone,
} from "../Redux/features/commentSlice";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/deleteComment`;

function MyComments(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.registerReducer);
  const { username } = useSelector(
    (store) => store.registerReducer.userRegisterInfo
  );
  const { isEditDone } = useSelector((store) => store.commentSlice);
  const { comments } = useSelector((store) => store.commentSlice);

  useEffect(() => {
    dispatch(getComments());
  }, []);

  const deleteComment = async (comment_id) => {
    dispatch(setSelectedComment(comment_id));
    const data = await axios({
      method: "DELETE",
      url: URL,
      data: {
        comment_id,
      },
      headers: {
        Authorization: token,
      },
    });
    setTimeout(() => {
      dispatch(getComments());
    }, 1000);
  };
  const updateComment = async (comment_id) => {
    dispatch(setSelectedComment(comment_id));
    dispatch(setEditDone(true));
  };
  return (
    <div className="my-comments-container">
      <h1 className="my-comments-title">Edit my comments</h1>
      {isEditDone && <UpdateComment />}
      {comments.length >= 1 ? (
        comments.map((comment, idx) => {
          return (
            <div
              id={comment.comment_id}
              key={idx}
              className="single-comment-container"
            >
              <div className="edit-delete-wrapper">
                <BsFillPencilFill
                  onClick={(e) => updateComment(comment.comment_id)}
                  className="edit-comment"
                />
                <BsTrash
                  onClick={(e) => deleteComment(comment.comment_id)}
                  className="delete-comment"
                />
              </div>

              <div className="comment-component">
                <Comment key={idx} comment={comment} username={username} />
              </div>
            </div>
          );
        })
      ) : (
        <h1>No Comments to display, You warmly welcomed to add some!</h1>
      )}
    </div>
  );
}

export default MyComments;
