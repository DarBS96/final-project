import React, { useEffect, useState } from "react";
import { showAllComments } from "../../Redux/features/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Comment from "../recipes/comments/Comment";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/showAllComments`;

function DisplayComments(props) {
  const token = useSelector((store) => store.registerReducer.token);
  const dispatch = useDispatch();
  const { comments, refreshComments } = useSelector(
    (store) => store.commentSlice
  );
  const { selectedRecipe } = useSelector((store) => store.recipesSlice);

  const [isComment, setIsComment] = useState(false);

  useEffect(() => {
    const { recipe_id } = selectedRecipe;

    const getAllRecipeComments = async () => {
      const data = await axios({
        method: "POST",
        url: URL,
        data: {
          recipe_id,
        },
        headers: {
          Authorization: token,
        },
      });
      if (data.data.comments.length >= 1) setIsComment(true);
      dispatch(
        showAllComments({
          comments: data.data.comments,
          username: data.data.username,
        })
      );
    };
    getAllRecipeComments();
  }, [isComment, refreshComments]);

  return (
    <>
      {isComment && (
        <div className="comments-container">
          {comments?.map((comment, idx) => {
            return <Comment key={idx} comment={comment} />;
          })}
        </div>
      )}
    </>
  );
}

export default DisplayComments;
