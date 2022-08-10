import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { refreshComments } from "../../../Redux/features/commentSlice";

const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/comment`;
function Comment({ recipe_id }) {
  const token = useSelector((store) => store.registerReducer.token);

  // const { recipes, views, comments, username } = useSelector(
  //   (store) => store.recipesSlice
  // );
  const initialState = {
    title: "",
    content: "",
    recipe_id,
  };
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios({
      method: "POST",
      url: URL,
      data: {
        values,
      },
      headers: {
        Authorization: token,
      },
    });

    setTimeout(() => {
      dispatch(refreshComments(true));
      //change to false back so it will be able to rerender it again at DisplayComments component
    }, 300);
    setTimeout(() => {
      dispatch(refreshComments(false));
    }, 1000);

    setValues(initialState);
    //Show all comments
  };
  return (
    <div class="comment-form">
      <form onSubmit={handleSubmit} className="form" name="form">
        <div class="form-row">
          <textarea
            className="input"
            placeholder="Add comment..."
            required
            value={values.title}
            id="comment-title"
            name="title"
            onChange={handleChange}
          ></textarea>
        </div>

        <div class="form-row">
          <input
            required
            value={values.content}
            id="comment-content"
            type="text"
            name="content"
            onChange={handleChange}
            className="input"
            placeholder="name"
          />
        </div>

        <div class="form-row">
          <input type="submit" value="Add Comment" />
        </div>
      </form>
    </div>
  );
}

export default Comment;
