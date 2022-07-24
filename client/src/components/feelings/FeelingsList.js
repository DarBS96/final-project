import { useEffect, useState } from "react";
import Feeling from "./Feeling";
import { getFeelings } from "../../Redux/features/feelingSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function FeelingsList(props) {
  const dispatch = useDispatch();
  const feelingsFromState = useSelector((store) => store.feelingSlice.feelings);
  // const token = useSelector((store) => store.registerReducer.token);

  // const token = useSelector((store) => store.registerReducer.token);

  useEffect(() => {
    dispatch(getFeelings());
  }, []);

  return (
    <div>
      <h1>How you doin?</h1>
      <div>
        {feelingsFromState?.map((feeling) => {
          return <Feeling feeling={feeling} key={feeling.feeling_id} />;
        })}
      </div>
    </div>
  );
}

export default FeelingsList;
