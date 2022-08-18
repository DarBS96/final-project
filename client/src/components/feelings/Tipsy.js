import React from "react";
import "../../css/feelings/feelingList.css";

function Tipsy({ handleClick, id, name }) {
  return (
    <svg
      onClick={(e) => handleClick(e, name)}
      className="happy"
      width="44px"
      height="44px"
      viewBox="0 0 44 44"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id={id}
    >
      <g
        id="Happy"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(0, 0)"
      >
        <circle
          onClick={(e) => handleClick(e, name)}
          id={id}
          className="Body"
          fill="#874356"
          cx="22"
          cy="22"
          r="22"
        ></circle>
        /
      </g>
      <g className="scaleFace">
        <g className="face">
          <ellipse
            id="Eye-right"
            fill="#2C0E0F"
            cx="29.0875"
            cy="21.75"
            rx="1.89926471"
            ry="1.75"
          ></ellipse>
          <ellipse
            id="Eye-left"
            fill="#2C0E0F"
            cx="14.8992647"
            cy="21.75"
            rx="1.89926471"
            ry="1.75"
          ></ellipse>
          <path
            d="M21.8941176,27.8819633 C24.8588235,27.8819632 25.4941176,25.5404999 25.4941176,24.5648901 C25.4941176,23.5892803 24.4352941,23.9795242 22.1058824,23.9795242 C19.7764706,23.9795242 18.2941176,23.5892803 18.2941176,24.5648901 C18.2941176,25.5404999 18.9294118,27.8819633 21.8941176,27.8819633 Z"
            id="Mouth"
            fill="#2C0E0F"
          ></path>
          <ellipse
            id="Tung"
            fill="#E23D18"
            cx="21.8941176"
            cy="26.4390244"
            rx="1.69411765"
            ry="0.780487805"
          ></ellipse>
        </g>
      </g>
    </svg>
  );
}

export default Tipsy;
