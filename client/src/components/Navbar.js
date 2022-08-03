import React from "react";
import ".././css/navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function NavbarComp(props) {
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
                <NavDropdown.Item href="#action/3.1">Romantic</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Tipsy</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Lonely</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Tense</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Creative</NavDropdown.Item>
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
