import React from "react";

function Comment({ comment, username }) {
  const { comment_body, comment_date, comment_title } = comment;
  const date = new Date(comment_date).toLocaleDateString("HE-IL");

  return (
    <div>
      <h4>{comment_title}</h4>
      <p>{comment_body}</p>
      {/* Display date only if there is a comment */}
      {comment_body || comment_title ? (
        <p>
          Wrote by {username} at {date}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default Comment;
