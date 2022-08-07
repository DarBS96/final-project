import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  selectedFeeling,
  feelingName,
} from "../../Redux/features/feelingSlice";
import "../../css/feelings/feeling.css";

function Feeling({ feeling }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    dispatch(selectedFeeling(e.target.id));
    dispatch(feelingName(e.target.textContent));
    navigate(`/recipes`);
  };
  return (
    // <div>
    //   <svg
    //     class="sad"
    //     width="44px"
    //     height="44px"
    //     viewBox="0 0 44 44"
    //     version="1.1"
    //     xmlns="http://www.w3.org/2000/svg"
    //     xmlnsXlink="http://www.w3.org/1999/xlink"
    //   >
    //     <g
    //       id="sad"
    //       stroke="none"
    //       stroke-width="1"
    //       fill="none"
    //       fill-rule="evenodd"
    //       transform="translate(0, 0)"
    //     >
    //       <circle id="body" fill="#E23D18" cx="22" cy="22" r="22"></circle>
    //       <g id="face" transform="translate(13.000000, 20.000000)">
    //         <g class="face">
    //           <path
    //             d="M7,4 C7,5.1045695 7.8954305,6 9,6 C10.1045695,6 11,5.1045695 11,4"
    //             class="mouth"
    //             stroke="#2C0E0F"
    //             stroke-width="1.5"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             transform="translate(9.000000, 5.000000) rotate(-180.000000) translate(-9.000000, -5.000000) "
    //           ></path>
    //           <ellipse
    //             class="right-eye"
    //             fill="#2C0E0F"
    //             cx="16.0941176"
    //             cy="1.75609756"
    //             rx="1.90588235"
    //             ry="1.75609756"
    //           ></ellipse>
    //           <ellipse
    //             class="left-eye"
    //             fill="#2C0E0F"
    //             cx="1.90588235"
    //             cy="1.75609756"
    //             rx="1.90588235"
    //             ry="1.75609756"
    //           ></ellipse>
    //         </g>
    //       </g>
    //     </g>
    //   </svg>
    // </div>
    <div
      className="feeling"
      id={feeling.feeling_id}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {feeling.feeling}
    </div>
  );
}

export default Feeling;
