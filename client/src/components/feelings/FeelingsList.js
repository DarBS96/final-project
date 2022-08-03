import { useEffect, useState } from "react";
import Feeling from "./Feeling";
import { getFeelings } from "../../Redux/features/feelingSlice";
import { useSelector, useDispatch } from "react-redux";
import "../../css/feelings/feelingList.css";

function FeelingsList(props) {
  const dispatch = useDispatch();
  const feelingsFromState = useSelector((store) => store.feelingSlice.feelings);

  useEffect(() => {
    dispatch(getFeelings());
  }, []);

  return (
    <div>
      <h1 className="feelingList-title">How you feeling today?</h1>
      <div className="feelings-container">
        {feelingsFromState?.map((feeling) => {
          return <Feeling feeling={feeling} key={feeling.feeling_id} />;
        })}
      </div>
    </div>
  );
}

export default FeelingsList;
