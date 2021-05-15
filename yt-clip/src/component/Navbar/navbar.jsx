<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
import { Navbar, Nav, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../_actions";

const NavBar = () => {
  const currentUser = useSelector((state) => state.authentication.loggedIn);
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(userActions.logout());
    console.log(currentUser);
  }

  var divStyle = {
    padding: "20px",
  };

  var fontStyle = {
    fontFamily: "Arial",
    fontSize: 20,
  };

  var smallIcon = {
    textAlign: "center",
    fontSize: 25,
    display: "inline-block",
    marginRight: "10px",
    verticalAlign: "middle",
    marginTop: -2,
  };

  var bigIcon = {
    fontSize: 45,
    display: "inline-block",
    marginRight: "10px",
    marginTop: "6px",
  };

  var navstyle = {
    position: "sticky",
    top: "0",
  };
  return (
    <React.Fragment>
      <Navbar
        bg="light"
        expand="xl"
        variant="light"
        sticky="top"
        style={navstyle}
      >
        <Navbar.Brand style={fontStyle}>Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav style={divStyle}>
              <NavLink to="/Home">
                <Icon.HouseDoor style={smallIcon} />
                Home
              </NavLink>
            </Nav>
            <Nav style={divStyle}>
<<<<<<< HEAD
              <NavLink to="/songlistpage">
=======
              <NavLink to="/songlist">
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
                {" "}
                <Icon.PersonPlus style={smallIcon} />
                Song
              </NavLink>
            </Nav>
          </Nav>
          {!currentUser ? (
            <Nav>
              <NavLink to="/Register">
                <Button
                  variant="outline-primary"
                  style={{ width: "120px", margin: 10 }}
                >
                  Register
                </Button>
              </NavLink>
              <NavLink to="/Login">
                <Button
                  variant="outline-primary"
                  style={{ width: "120px", margin: 10 }}
                >
                  Login
                </Button>
              </NavLink>
            </Nav>
          ) : (
            <Nav>
              <Nav>
                <NavLink to="/Profile">
                  <Icon.PersonCircle style={bigIcon} />
                </NavLink>
              </Nav>
              <Button
                variant="outline-primary"
                style={{ width: "120px", margin: 10 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
