import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedFeeling } from "../../Redux/features/feelingSlice";
function Feeling({ feeling }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    dispatch(selectedFeeling(e.target.id));
    navigate("/recipes");
  };
  return (
    <div
      id={feeling.feeling_id}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {feeling.feeling}
    </div>
  );
}

export default Feeling;
