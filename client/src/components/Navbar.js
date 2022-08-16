import React from "react";
import ".././css/navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogin } from "../Redux/features/registerSlice";
import { feelingName } from "../Redux/features/feelingSlice";

function NavbarComp() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(isLogin(false));
  };
  return (
    <div>
      <Navbar bg="light" expand="lg" collapseOnSelect="true">
        <Container className="navbar-container">
          <Navbar.Brand className="navbar-brand">FeelEat!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav  " />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto w-100">
              <Nav.Link as={Link} to={"/home"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/myComments"}>
                My comments
              </Nav.Link>
              <NavDropdown title="Favorites" id="basic-nav-dropdown">
                <NavDropdown.Item href={""}>
                  <Nav.Link
                    className="dropdown-custom"
                    as={Link}
                    to={`/savedRecipes/1`}
                    onClick={() => dispatch(feelingName("Romantic"))}
                  >
                    Romantic
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link
                    className="dropdown-custom"
                    as={Link}
                    to={"/savedRecipes/3"}
                    onClick={() => dispatch(feelingName("Tipsy"))}
                  >
                    Tipsy
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item href={""}>
                  <Nav.Link
                    className="dropdown-custom"
                    as={Link}
                    to={"/savedRecipes/4"}
                    onClick={() => dispatch(feelingName("Lonely"))}
                  >
                    Lonely
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item href={""}>
                  <Nav.Link
                    className="dropdown-custom"
                    as={Link}
                    to={"/savedRecipes/5"}
                    onClick={() => dispatch(feelingName("Tense"))}
                  >
                    Tense
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                className="ms-0 ms-lg-auto"
                onClick={handleClick}
                as={Link}
                to={"/login"}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
