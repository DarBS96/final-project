import React, { useEffect } from "react";
import { useState } from "react";
import "../../.././css/starRating.css";
import { useDispatch, useSelector } from "react-redux";
import { ratingAvg } from "../../../Redux/features/recipesSlice";
import axios from "axios";
import Rating from "@mui/material/Rating";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/rating`;

const StarRating = ({ recipe_id }) => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.registerReducer.token);
  const ratingsAvg = useSelector((store) => store.recipesSlice.rating);
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
    <>
      {ratingsAvg && <div>Average {Number(ratingsAvg).toFixed(1)}</div>}
      {!ratingIsExist ? (
        <>
          <Rating
            name="simple-controlled"
            value={Number(value)}
            onChange={(event, newValue) => handleChange(event, newValue)}
          />
        </>
      ) : (
        <div>
          <Rating name="read-only" value={Number(value)} readOnly />
        </div>
      )}
    </>
  );
};
export default StarRating;
