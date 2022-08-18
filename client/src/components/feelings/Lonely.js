import React from "react";
import "../../css/feelings/feelingList.css";

function Lonely({ handleClick, id, name }) {
  return (
    <svg
      onClick={(e) => handleClick(e, name)}
      className="sad"
      width="44px"
      height="44px"
      viewBox="0 0 44 44"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id={id}
    >
      <g
        id="sad"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(0, 0)"
      >
        <circle
          onClick={(e) => handleClick(e, name)}
          id={id}
          className="body"
          fill="#F6E7D8"
          cx="22"
          cy="22"
          r="22"
        ></circle>
        <g id="face" transform="translate(13.000000, 20.000000)">
          <g className="face">
            <path
              d="M7,4 C7,5.1045695 7.8954305,6 9,6 C10.1045695,6 11,5.1045695 11,4"
              className="mouth"
              stroke="#2C0E0F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(9.000000, 5.000000) rotate(-180.000000) translate(-9.000000, -5.000000) "
            ></path>
            <ellipse
              className="right-eye"
              fill="#2C0E0F"
              cx="16.0941176"
              cy="1.75609756"
              rx="1.90588235"
              ry="1.75609756"
            ></ellipse>
            <ellipse
              className="left-eye"
              fill="#2C0E0F"
              cx="1.90588235"
              cy="1.75609756"
              rx="1.90588235"
              ry="1.75609756"
            ></ellipse>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Lonely;
