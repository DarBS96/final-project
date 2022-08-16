import React from "react";
import { BsFillTrash2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredIngredients,
  filteredMethods,
} from "../../Redux/features/recipesSlice";
import "../.././css/addedItems.css";
function DisplayAddedItem({ ingredients, preparation }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (preparation) {
      const arrFilteredMethods = preparation.filter(
        (method) =>
          method.id !== e.target.parentElement.parentElement.parentElement.id
      );
      dispatch(filteredMethods(arrFilteredMethods));
    }
    if (ingredients) {
      const arrFilteredIngredients = ingredients.filter(
        (ingredient) =>
          ingredient.id !==
          e.target.parentElement.parentElement.parentElement.id
      );
      dispatch(filteredIngredients(arrFilteredIngredients));
    }
  };

  return (
    <div>
      {preparation
        ? preparation.map((method, idx) => (
            <div key={idx} id={method.id} className="li-container">
              <div className="description-container">{`${method.number}. ${method.method}`}</div>
              <div className="trash-container">
                <BsFillTrash2Fill onClick={handleClick} className="trash" />
              </div>
            </div>
          ))
        : ingredients.map((ingredient, idx) => (
            <div key={idx} id={ingredient.id} className="li-container">
              <div className="description-container">
                {`${ingredient.amount} ${ingredient.units} ${ingredient.name}`}
              </div>
              <div className="trash-container">
                <BsFillTrash2Fill className="trash" onClick={handleClick} />
              </div>
            </div>
          ))}
    </div>
  );
}

export default DisplayAddedItem;
