import React from "react";
import "../../css/feelings/feelingList.css";

function Romantic({ handleClick, id, name }) {
  return (
    <svg
      onClick={(e) => handleClick(e, name)}
      className="fine"
      width="44px"
      height="44px"
      viewBox="0 0 44 44"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id={id}
    >
      <g
        id="fine-emotion"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="fine">
          <circle
            onClick={(e) => handleClick(e, name)}
            className="body"
            fill="#C65D7B"
            cx="22"
            cy="22"
            r="22"
            id={id}
          ></circle>
          <g className="matrix" transform="translate(22.000000, 32.000000)">
            <g className="face-container">
              <g className="face" transform="translate(-9, -12)">
                <g className="face-upAndDown">
                  <g className="eyes">
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
                  <path
                    d="M6.18823529,4.90499997 C6.18823529,5.95249999 7.48721095,7 9.08957864,7 C10.6919463,7 11.990922,5.95249999 11.990922,4.90499997"
                    id="mouth"
                    stroke="#2C0E0F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Romantic;
