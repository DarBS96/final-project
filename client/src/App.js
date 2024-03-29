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
import MyComments from "./Pages/MyComments";
import AddRecipe from "./Pages/AddRecipe";
import Recipe from "./Pages/Recipe";
import VerifyToken from "./components/VerifyToken";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//remove navbar when login by update the stor if i'm logging

function App() {
  const isLogin = useSelector((store) => store.registerReducer.isLogin);
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
          <Route
            path="/myComments"
            element={
              <VerifyToken>
                <MyComments />
              </VerifyToken>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
