import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarMain from './Components/NavbarMain';
import Post from './Components/Post';
import SideBar from './Components/SideBar';
import DisplayPost from './Components/DisplayPost';
import { Row, Col, Container } from 'react-bootstrap';
import API from './utils/API';
import { useAuth0 } from "@auth0/auth0-react"
const { getBikes } = API;


function App() {
  const {isAuthenticated } = useAuth0();
  const [posts, setPosts] = useState([]);
  console.log(posts.data)

  const getPosts = (cat) => {
    getBikes(cat)
      .then(res => setPosts(res))
      .catch(err => setPosts([err]));
  }

  useEffect(() => {
    if (posts.length === 0) getPosts('all');
  }, [posts]);

  return (
    <Router>
      <NavbarMain />
      <Container className="row" fluid={true}>
        <Col xs="2">
          <SideBar func={getPosts} />
        </Col>
        <Col cs="10">
          <Row>
            {isAuthenticated ? <Post /> : <div/> }
            
          </Row>
          <Row>
            { posts.map((post, i) =>
              <DisplayPost 
                key={ i }
                post={ post }
              />
            ) }
          </Row>
        </Col>
      </Container>
    </Router>
  );
}

export default App;
