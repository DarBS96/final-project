import React from "react";
import "../../.././css/comment.css";
function Comment({ comment, username }) {
  const { comment_body, comment_date, comment_title } = comment;
  const date = new Date(comment_date).toLocaleString("EN-US");

  return (
    // <div className="comments">
    <div className="comment">
      <div className="comment-box">
        <h5 className="comment-title">{comment_title}</h5>
        <div className="comment-text">{comment_body}</div>
        <div className="comment-footer">
          <div className="comment-info">
            <span className="comment-author">{username}</span>
            <span className="comment-date">{date}</span>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Comment;
