import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeelings } from "../../Redux/features/feelingSlice";
import { useSelector, useDispatch } from "react-redux";
import "../../css/feelings/feelingList.css";
import {
  selectedFeeling,
  feelingName,
} from "../../Redux/features/feelingSlice";

function FeelingsList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feelings = useSelector((store) => store.feelingSlice.feelings);

  useEffect(() => {
    dispatch(getFeelings());
  }, []);

  const handleClick = (e) => {
    dispatch(selectedFeeling(e.target.id));
    dispatch(feelingName(e.target.name));
    navigate(`/recipes`);
  };

  return (
    <div>
      <h1 className="feelingList-title">How you feeling today?</h1>
      <main className="emotions-container">
        <div className="emotion-container">
          <p
            id={feelings[2]?.feeling_id}
            name={feelings[2]?.feeling}
            onClick={handleClick}
            className="emotion-description"
          >
            Lonely
          </p>
          <svg
            className="sad"
            width="44px"
            height="44px"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="sad"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              transform="translate(0, 0)"
            >
              <circle id="body" fill="#F6E7D8" cx="22" cy="22" r="22"></circle>
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
        </div>
        <div className="emotion-container">
          <p
            id={feelings[3]?.feeling_id}
            name={feelings[3]?.feeling}
            onClick={handleClick}
            className="emotion-description"
          >
            Tense
          </p>
          <svg
            className="neutral"
            width="44px"
            height="44px"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <circle id="body" fill="#F68989" cx="22" cy="22" r="22"></circle>
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
        </div>
        <div className="emotion-container">
          <p
            id={feelings[0]?.feeling_id}
            name={feelings[0]?.feeling}
            onClick={handleClick}
            className="emotion-description"
          >
            Romantic
          </p>
          <svg
            className="fine"
            width="44px"
            height="44px"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
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
                  id="body"
                  fill="#C65D7B"
                  cx="22"
                  cy="22"
                  r="22"
                ></circle>
                <g
                  className="matrix"
                  transform="translate(22.000000, 32.000000)"
                >
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
        </div>
        <div className="emotion-container">
          <p
            id={feelings[1]?.feeling_id}
            name={feelings[1]?.feeling}
            onClick={handleClick}
            className="emotion-description"
          >
            Tipsy
          </p>
          <svg
            className="happy"
            width="44px"
            height="44px"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Happy"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              transform="translate(0, 0)"
            >
              <circle id="Body" fill="#874356" cx="22" cy="22" r="22"></circle>/
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
        </div>
      </main>
    </div>
  );
}

export default FeelingsList;
