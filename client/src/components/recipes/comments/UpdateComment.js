import React, { useEffect, useState } from "react";
import axios from "axios";
import { getComments, setEditDone } from "../../../Redux/features/commentSlice";
import { useSelector, useDispatch } from "react-redux";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/updateComment`;

function UpdateComment({ placeholder }) {
  const token = useSelector((store) => store.registerReducer.token);
  const comment_id = useSelector((store) => store.commentSlice.selectedComment);

  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setContent(value);
  };
  const handleSubmit = async (e) => {
    dispatch(setEditDone(false));
    e.preventDefault();
    const data = await axios({
      method: "PUT",
      url: URL,
      data: {
        content,
        comment_id,
      },
      headers: {
        Authorization: token,
      },
    });
    setTimeout(() => {
      dispatch(getComments());
    }, 500);
    setContent("");
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit} className="form" name="form">
        <div className="form-row">
          <textarea
            className="input"
            placeholder={placeholder}
            required
            value={content}
            name="content"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-row">
          <input type="submit" value="Edit Comment" />
        </div>
      </form>
    </div>
  );
}

export default UpdateComment;
