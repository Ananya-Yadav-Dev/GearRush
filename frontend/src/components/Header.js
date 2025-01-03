import React from "react";
import {useDispatch, useSelector} from "react-redux";
// import {LinkContainer} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {logout} from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
;  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;


  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="" variend="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">GearRush</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{justifyContent: "flex-end"}}
          >
            <Nav className="mr-0">
              <Nav.Link onClick={() => { navigate('/cart') }}>
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <Nav.Link onClick={() => {navigate('/profile')}}>
                    <i className="fas fa-user"></i>Profile
                  </Nav.Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={() => { navigate("/login") }}>
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <Nav.Link onClick={() => {navigate("/admin/userlist")}}>
                    <i className="fas fa-user"></i>Users
                  </Nav.Link>
                  <Nav.Link onClick={ () => { navigate("/admin/productlist") }}>Products</Nav.Link>
                  <Nav.Link onClick= {() => { navigate("/admin/orderlist") }}>Orders</Nav.Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
