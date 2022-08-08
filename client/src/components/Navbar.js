import React from "react";
import ".././css/navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogin } from "../Redux/features/registerSlice";

function NavbarComp() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(isLogin(false));
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="navbar-brand">Feeleat!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/home"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/myComments"}>
                My comments
              </Nav.Link>
              <NavDropdown title="Favorites" id="basic-nav-dropdown">
                <Nav.Link as={Link} to={`/savedRecipes/1`}>
                  Romantic
                </Nav.Link>
                <Nav.Link as={Link} to={"/savedRecipes/3"}>
                  Tipsy
                </Nav.Link>
                <Nav.Link as={Link} to={"/savedRecipes/4"}>
                  Lonely
                </Nav.Link>
                <Nav.Link as={Link} to={"/savedRecipes/5"}>
                  Tense
                </Nav.Link>
                <Nav.Link as={Link} to={"/savedRecipes/6"}>
                  Creative
                </Nav.Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link onClick={handleClick} as={Link} to={"/login"}>
            Logout
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
