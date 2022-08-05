import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/Navbar";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";
import Recipes from "./Pages/Recipes";
import DisplaySavedRecipes from "./Pages/DisplaySavedRecipes";
import AddRecipe from "./Pages/AddRecipe";
import Recipe from "./Pages/Recipe";
import VerifyToken from "./components/VerifyToken";
import { useSelector } from "react-redux";

//remove navbar when login by update the stor if i'm logging

function App() {
  const isLogin = useSelector((store) => store.registerReducer.isLogin);
  // const recipe_id = useSelector(
  //   (store) => store.recipesSlice.recipes[0].recipe_id
  // );
  // console.log(recipe_id);
  return (
    <div className="App">
      <Router>
        {isLogin && <NavbarComp />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/recipes"
            element={
              <VerifyToken>
                <Recipes />
              </VerifyToken>
            }
          />
          <Route
            path="/addCustomRecipe"
            element={
              <VerifyToken>
                <AddRecipe />
              </VerifyToken>
            }
          />
          <Route
            path="/chosenRecipe"
            element={
              <VerifyToken>
                <Recipe />
              </VerifyToken>
            }
          />
          <Route
            path="/savedRecipes/:feeling_id"
            element={
              <VerifyToken>
                <DisplaySavedRecipes />
              </VerifyToken>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
