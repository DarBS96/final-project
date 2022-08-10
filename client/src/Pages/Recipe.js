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

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const wantedSyntaxDate = new Date(date).toLocaleString("en-US", options);
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

    // <div id={recipe_id} className="recipe-container">
    //   <h1>{title}</h1>
    //   <img style={{ width: "200px", height: "200px" }} src={img} alt="fds" />
    //   <br />
    //   <StarRating recipe_id={recipe_id} />
    //   <h2>Views:</h2>
    //   <p>{views}</p>
    //   <SaveRecipe recipe_id={recipe_id} />
    //   <h2>Ingredients</h2>
    //   {ingredients.map((ingredient, idx) => (
    //     <p key={idx}>{name + amount + units}</p>
    //   ))}
    //   <h2>Method</h2>
    //   {/* <p>Method{preparation}</p> */}
    //   <h2>Author</h2>
    //   <p>{author}</p>
    //   <h2>Write at:</h2>
    //   <p>{wantedSyntaxDate}</p>
    //   <AddComment recipe_id={recipe_id} />
    //   <DisplayComments />
    // </div>
  );
}

export default Recipe;
