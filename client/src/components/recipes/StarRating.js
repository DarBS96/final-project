import React, { useEffect } from "react";
import { useState, useRef } from "react";
import "../../css/starRating.css";
import { useDispatch, useSelector } from "react-redux";
import { addingRating } from "../../Redux/features/recipesSlice";
import axios from "axios";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes`;

const StarRating = ({ id }) => {
  const token = useSelector((store) => store.registerReducer.token);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [msg, setMsg] = useState("");
  // const btnElem = useRef();

  const dispatch = useDispatch();

  const handleClick = async (index) => {
    setRating(index);
    dispatch(addingRating(rating));
    //How to remove onMouseEnter after clicking?
    // and unable user to rate anymore
    setMsg("Your opinion very important to us!");
    const data = await axios({
      method: "POST",
      url: URL,
      headers: {
        Authorization: token,
      },
      params: { id },
    });
    console.log(data);
  };
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            // ref={btnElem}
            id="star-toggle"
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => handleClick(index)}
            // onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span key={index} className="star">
              &#9733;
            </span>
          </button>
        );
      })}
      <p>{msg}</p>
    </div>
  );
};
export default StarRating;
