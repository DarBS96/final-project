import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedFeeling } from "../../Redux/features/feelingSlice";
import "../../css/feelings/feeling.css";

function Feeling({ feeling }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    dispatch(selectedFeeling(e.target.id));
    navigate("/recipes");
  };
  return (
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
