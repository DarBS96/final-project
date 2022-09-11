import React from "react";
import "../../.././css/comment.css";
import { BsChatLeftDots } from "react-icons/bs";
function Comment({ comment }) {
  const { comment_id, comment_body, comment_date, username } = comment;
  const date = new Date(comment_date).toLocaleString("EN-US");

  return (
    <div id={comment_id} className="comment">
      <BsChatLeftDots className="comment-icon" />
      <div className="comment-box">
        <div className="comment-text">{comment_body}</div>
        <div className="comment-footer">
          <div className="comment-info">
            <span className="comment-author">{username}</span>
            <span className="comment-date">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
