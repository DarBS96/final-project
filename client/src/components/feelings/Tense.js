import React from "react";
import "../../css/feelings/feelingList.css";

function Tense({ handleClick, id, name }) {
  return (
    <svg
      onClick={(e) => handleClick(e, name)}
      id={id}
      className="neutral"
      width="44px"
      height="44px"
      viewBox="0 0 44 44"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <circle
          onClick={(e) => handleClick(e, name)}
          id={id}
          className="body"
          fill="#F68989"
          cx="22"
          cy="22"
          r="22"
        ></circle>
        <g className="face">
          <g transform="translate(13.000000, 20.000000)" fill="#2C0E0F">
            <g className="mouth">
              <g transform="translate(9, 5)">
                <rect x="-2" y="0" width="4" height="2" rx="2"></rect>
              </g>
            </g>
            <ellipse
              className="right-eye"
              cx="16.0941176"
              cy="1.75"
              rx="1.90588235"
              ry="1.75"
            ></ellipse>
            <ellipse
              className="left-eye"
              cx="1.90588235"
              cy="1.75"
              rx="1.90588235"
              ry="1.75"
            ></ellipse>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Tense;
