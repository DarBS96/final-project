import React from "react";

function Comment(props) {
  return (
    <div className="comment-container">
      <h3>Add a comment to the recipe!</h3>
      <form>
        <label htmlFor="comment-title"> title</label> <br />
        <input id="comment-title" type="text" name="comment-title" />
        <br />
        <label htmlFor="comment-content">content</label> <br />
        <input id="comment-content" type="text" name="comment-content" />
        <br />
        {/* When user click the button add dateNow func to the date */}
        <button>Add!</button>
      </form>
    </div>
  );
}

export default Comment;
