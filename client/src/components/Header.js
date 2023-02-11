import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { LinkContainer } from "react-router-bootstrap";
import { GiGorilla } from "react-icons/gi";
import TopInfo from "./TopInfo";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const Header = ({ signoutHandler, cart, userInfo }) => {
  return (
    <header>
      <TopInfo />

      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-uppercase">
              <GiGorilla /> Fear of Monkey
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />

            <Nav className="me-auto  w-100  justify-content-end">
              <Link to="/search" className="nav-link text-uppercase">
                Shop
              </Link>

              {userInfo ? (
                <NavDropdown
                  className="text-uppercase"
                  title={userInfo.name}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link text-uppercase" to="/signin">
                  Sign In
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  className="text-uppercase"
                  title="Admin"
                  id="admin-nav-dropdown"
                >
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              <Link to="/cart" className="nav-link">
                <ShoppingCartIcon />
                {cart.cartItems.length > 0 && (
                  <Badge
                    badgeContent={cart.cartItems.reduce(
                      (acc, val) => acc + val.quantity,
                      0
                    )}
                    color="secondary"
                    style={{ transform: "translate(2px, -10px" }}
                  ></Badge>
                )}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
