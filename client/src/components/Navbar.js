import React from "react";
import ".././css/navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavbarComp() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={"/"} className="navbar-brand">
            Feeleat!
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              <NavDropdown title="My list" id="basic-nav-dropdown">
                <Nav.Link as={Link} to={`/savedRecipes/1`}>
                  Romantic
                </Nav.Link>
                <Nav.Link as={Link} to={"/savedRecipes/2"}>
                  Tipsy
                </Nav.Link>
                <Nav.Link as={Link} to={"/savedRecipes/3"}>
                  Lonely
                </Nav.Link>
                <Nav.Link as={Link} to={"/savedRecipes/4"}>
                  Tense
                </Nav.Link>
                <Nav.Link as={Link} to={"/savedRecipes/5"}>
                  Creative
                </Nav.Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link as={Link} to={"/login"}>
            Logout
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
