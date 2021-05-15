
import './App.css';
import AuthenticationButton from './Components/authenticationButton';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import logo from "./images/bike-check-logo.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


function App() {
  return (
    <Router>
      <Container className="p-0" fluid={true}>

      <Navbar className='Navbar navbar-dark navigation ' bg="transparent" expand="lg">
        <Navbar.Brand className='nav-fonts'><img href='/' src={logo} className="headerLogo"/></Navbar.Brand>
        <Navbar.Toggle className='border-0' aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
          <Nav className='linkNav'>
            <Link className="homeNav" to='/'> Home</Link>
            <Link className="homeNav" to='/Profile:id'> Profile</Link>
            <AuthenticationButton/>
          </Nav>
          </Navbar.Collapse>
      </Navbar>

      </Container>
    </Router>
  );
}

export default App;
