import React from "react";
import { BsFillTrash2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredIngredients,
  filteredMethods,
} from "../../Redux/features/recipesSlice";
function DisplayAddedItem({ ingredients, preparation }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (preparation) {
      const arrFilteredMethods = preparation.filter(
        (method) => method.id !== e.target.parentElement.parentElement.id
      );
      dispatch(filteredMethods(arrFilteredMethods));
    }
    if (ingredients) {
      const arrFilteredIngredients = ingredients.filter(
        (ingredient) =>
          ingredient.id !== e.target.parentElement.parentElement.id
      );
      dispatch(filteredIngredients(arrFilteredIngredients));
    }
  };

  return (
    <div>
      {preparation
        ? preparation.map((method, idx) => (
            <div key={idx} id={method.id}>
              {`${method.number}. ${method.method}`}
              <BsFillTrash2Fill
                onClick={handleClick}
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          ))
        : ingredients.map((ingredient, idx) => (
            <div key={idx} id={ingredient.id}>
              {`${ingredient.amount} ${ingredient.units} ${ingredient.name}`}
              <BsFillTrash2Fill
                onClick={handleClick}
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          ))}
    </div>
  );
}

export default DisplayAddedItem;
