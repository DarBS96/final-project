import { useEffect, useState } from "react";
import Feeling from "./Feeling";
import { getFeelings } from "../../Redux/features/feelingSlice";
import { useSelector, useDispatch } from "react-redux";

function FeelingsList(props) {
  const dispatch = useDispatch();
  const feelingsFromState = useSelector((store) => store.feelingSlice.feelings);
  const [feelings, setFeelings] = useState([]);

  useEffect(() => {
    dispatch(getFeelings());
    setFeelings(feelingsFromState);
  }, []);

  return (
    <div>
      <h1>How you doin?</h1>
      <div>
        {feelings.map((feeling) => {
          return <Feeling feeling={feeling} key={feeling.feeling_id} />;
        })}
      </div>
    </div>
  );
}

export default FeelingsList;
