import React, { useEffect } from "react";
import { useState } from "react";
import "../../.././css/starRating.css";
import { useDispatch, useSelector } from "react-redux";
import { ratingAvg, setVotes } from "../../../Redux/features/recipesSlice";
import axios from "axios";
import Rating from "@mui/material/Rating";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/rating`;

const StarRating = ({ recipe_id }) => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.registerReducer.token);
  const { ratingsAvg, votes } = useSelector((store) => store.recipesSlice);
  const [value, setValue] = useState(ratingsAvg);
  const [ratingIsExist, setRatingIsExist] = useState(false);
  useEffect(() => {
    const getRatingAvg = async () => {
      const data = await axios({
        method: "POST",
        url: `${URL}/average`,
        data: {
          recipe_id,
        },
        headers: {
          Authorization: token,
        },
      });

      dispatch(ratingAvg(data.data.ratingAvg));

      dispatch(setVotes(data.data.votes));
      //Check if user can rate
      if (
        // if there is no user
        data.data.rating.length < 1 ||
        // if there are users that already rated
        !data.data.rating
      ) {
        setRatingIsExist(false);
      } else {
        setRatingIsExist(true);
      }
      setValue(data.data.ratingAvg);
    };
    getRatingAvg();
  }, [value]);

  const handleChange = async (event, newValue) => {
    setRatingIsExist(true);
    const data = await axios({
      method: "POST",
      url: URL,
      headers: {
        Authorization: token,
      },
      data: {
        newValue,
        recipe_id,
      },
    });
    setValue(newValue);
  };
  return (
    // {Number(ratingsAvg).toFixed(1)} // *Average Number"
    <>
      {!ratingIsExist ? (
        <div className="rating-container">
          <Rating
            size={"small"}
            name="simple-controlled"
            value={Number(value)}
            onChange={(event, newValue) => handleChange(event, newValue)}
          />
          {ratingsAvg && <div className="votes">{`(${votes} votes) `}</div>}
        </div>
      ) : (
        <div className="rating-container">
          <Rating
            size={"small"}
            className="stars-rating"
            name="read-only"
            value={Number(value)}
            readOnly
            precision={0.5}
          />
          {ratingsAvg && <div className="votes">{`(${votes} votes) `}</div>}
        </div>
      )}
    </>
  );
};
export default StarRating;
