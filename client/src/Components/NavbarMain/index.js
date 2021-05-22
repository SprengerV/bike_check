import React, { useEffect } from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../images/bike-check-logo.png";
import { Link } from "react-router-dom"
import AuthenticationButton from '../authenticationButton';
import { useAuth0 } from "@auth0/auth0-react"
import api from '../../controllers/api';


const NavbarMain = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({ audience: 'bike-check' });
      api.userCreate(user, token);
    }
  }, [user]);

  return (
    <Container className="p-0" fluid={true}>

      <Navbar className='Navbar navbar-dark  navigation ' bg="transparent" expand="lg">
        <Navbar.Brand className='nav-fonts'><img href='/' src={logo} className="headerLogo" /></Navbar.Brand>
        <div className="navButton-border">
          <Navbar.Toggle id="navButton" className='navButton' aria-controls="navbar-toggle" />
        </div>
        <Navbar.Collapse id="navbar-toggle">
          <Nav className='linkNav'>
            <Link className="homeNav" to='/'> Home</Link>

            {isAuthenticated ?
              <Link className="homeNav" to='/Profile:id'> Profile</Link> :
              <div />}
            <AuthenticationButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>ƒ

    </Container>
  )
}

export default NavbarMain
