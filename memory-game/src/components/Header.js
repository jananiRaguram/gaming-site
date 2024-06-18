// header.js
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
import logo from '../images/logo.svg';
import '../styles/header.css';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="lg" className='pb-4'>
      {/* <Container> */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            className="d-inline-block align-top logo"
            alt="team 10"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" variant="pills">
            <NavDropdown title="Games" id="gamesDropdown">
              <NavDropdown.Item as={Link} to="/matchgame">Memory Match Up</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/buzzwords-start">Buzz Words</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/wordsearch-start">Word Search</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/game-stats" className={location.pathname === '/game-stats' ? 'active' : ''}>Leaderboard</Nav.Link>
          </Nav>
          <Nav className="ml-auto" variant="pills">
            <NavDropdown title="About Us" id="aboutDropdown collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/about/mohammad">Mohammad</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about/ameer">Ameer</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about/amardeep">Amardeep</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about/natalie">Natalie</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about/janani">Janani</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about/nitin">Nitin</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Game Engines" id="gameEnginesDropdown">
                <NavDropdown.Item as={Link} to="/games/phaser-demo">Phaser</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/games/pixi-demo">Pixi JS</NavDropdown.Item>
              </NavDropdown>
            <Nav.Link as={Link} to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign up</Nav.Link>
            <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Log in</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
};

export default Header;
