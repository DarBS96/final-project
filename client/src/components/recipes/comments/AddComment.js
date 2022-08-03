import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import DisplayComments from "./DisplayComments";
import { refreshComments } from "../../../Redux/features/recipesSlice";

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
      //change to false so it will be able to rerender at DisplayComments component
    }, 200);
    setTimeout(() => {
      dispatch(refreshComments(false));
    }, 1000);

    setValues(initialState);
    //Show all comments
  };
  return (
    <div className="comment-container">
      <h3>Add a comment to the recipe!</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-title"> title</label> <br />
        <input
          required
          value={values.title}
          id="comment-title"
          type="text"
          name="title"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="comment-content">content</label> <br />
        <input
          required
          value={values.content}
          id="comment-content"
          type="text"
          name="content"
          onChange={handleChange}
        />
        <br />
        {/* When user click the button add dateNow func to the date */}
        <button>Add!</button>
      </form>
    </div>
  );
}

export default Comment;
