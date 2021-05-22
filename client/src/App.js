
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import NavbarMain from './Components/NavbarMain';
import Post from './Components/Post';
import SideBar from './Components/SideBar';
import DisplayPost from './Components/DisplayPost';
import { Row, Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <NavbarMain />
      <Container className="row" fluid={true}>
        <SideBar/>
        <Post/>
      </Container>
      <Row>
        <DisplayPost/>
      </Row>
    </Router>
  );
}

export default App;
