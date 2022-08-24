import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeelings } from "../../Redux/features/feelingSlice";
import { useSelector, useDispatch } from "react-redux";
import "../../css/feelings/feelingList.css";
import {
  selectedFeeling,
  feelingName,
} from "../../Redux/features/feelingSlice";
import Lonely from "./Lonely";
import Tense from "./Tense";
import Romantic from "./Romantic";
import Tipsy from "./Tipsy";

function FeelingsList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feelings = useSelector((store) => store.feelingSlice.feelings);

  useEffect(() => {
    dispatch(getFeelings());
  }, []);

  const handleClick = (e, name) => {
    const { id } = e.target;
    console.log(id, name);
    localStorage.setItem(
      "feeling",
      JSON.stringify({
        selectedFeeling: Number(id),
        feelingName: name,
      })
    );
    dispatch(selectedFeeling());
    dispatch(feelingName());
    navigate(`/recipes`);
  };

  return (
    <div>
      <h1 className="feelingList-title">How do you feel today?</h1>
      <main className="emotions-container">
        <div className="emotion-container">
          <p
            id={feelings[2]?.feeling_id}
            onClick={(e) => handleClick(e, feelings[2]?.feeling)}
            className="emotion-description"
          >
            Lonely
          </p>
          <Lonely
            id={feelings[2]?.feeling_id}
            name={feelings[2]?.feeling}
            handleClick={handleClick}
          />
        </div>
        <div className="emotion-container">
          <p
            id={feelings[3]?.feeling_id}
            className="emotion-description"
            onClick={(e) => handleClick(e, feelings[3]?.feeling)}
          >
            Tense
          </p>
          <Tense
            id={feelings[3]?.feeling_id}
            name={feelings[3]?.feeling}
            handleClick={handleClick}
          />
        </div>
        <div className="emotion-container">
          <p
            id={feelings[0]?.feeling_id}
            onClick={(e) => handleClick(e, feelings[0]?.feeling)}
            className="emotion-description"
          >
            Romantic
          </p>
          <Romantic
            handleClick={handleClick}
            id={feelings[0]?.feeling_id}
            name={feelings[0]?.feeling}
          />
        </div>
        <div className="emotion-container">
          <p
            id={feelings[1]?.feeling_id}
            onClick={(e) => handleClick(e, feelings[1]?.feeling)}
            className="emotion-description"
          >
            Tipsy
          </p>
          <Tipsy
            id={feelings[1]?.feeling_id}
            name={feelings[1]?.feeling}
            handleClick={handleClick}
          />
        </div>
      </main>
    </div>
  );
}

export default FeelingsList;
