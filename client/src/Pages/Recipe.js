import { useSelector, useDispatch } from "react-redux";
import AddComment from "../components/recipes/comments/AddComment";
import { useEffect, useState } from "react";
import StarRating from "../components/recipes/Inputs/StarRating";
import DisplayComments from "../components//allToDisplay/DisplayComments";
import SaveRecipe from "../components/recipes/SaveRecipe";
import ".././css/singleRecipe.css";
function Recipe(props) {
  const { recipes, views, comments } = useSelector(
    (store) => store.recipesSlice
  );
  const {
    title,
    preparation,
    description,
    author,
    date,
    ingredients,
    img,
    recipe_id,
  } = recipes[0];

  return (
    <main className="screen-container">
      <div className="recipe-overview">
        <section className="section-one">
          <div className="img-description-title-wrapper">
            <div className="description-title-wrapper">
              <h2 className="main-title">{title}</h2>

              <p className="description">{description}</p>
            </div>
            <img className="recipe-img" src={img} alt="recipe" />
          </div>
          <div className="views-rating-wrapper">
            <p className="views">views: {views}</p>
            <StarRating recipe_id={recipe_id} />
          </div>
        </section>

        <section className="section-two">
          <h2 className="ingredients-title title">Ingredients</h2>
          {ingredients
            .map((ingredient) => JSON.parse(ingredient))
            .map((ingredient, idx) => {
              return (
                <div key={idx} className="ingredient">
                  <p>{`${ingredient.amount} ${ingredient.units}  ${ingredient.name} `}</p>
                </div>
              );
            })}
          <h2 className="preparation-title title">Preparation</h2>
          {preparation
            .map((preparation) => JSON.parse(preparation))
            .map((preparation, idx) => {
              return (
                <div key={idx} className="preparation">
                  <p>{`${preparation.number}. ${preparation.method} `}</p>
                </div>
              );
            })}
          <SaveRecipe recipe_id={recipe_id} />
          <div className="author">{author}</div>
        </section>
      </div>
      <div className="comments-container ">
        <AddComment recipe_id={recipe_id} />
        <DisplayComments />
      </div>
    </main>
  );
}

export default Recipe;
