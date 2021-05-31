import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavbarMain from './Components/NavbarMain';
import Post from './Components/Post';
import SideBar from './Components/SideBar';
import DisplayPost from './Components/DisplayPost';
import Modal from './Components/Modal/index';

import { Row, Col, Container } from 'react-bootstrap';
import API from './utils/API';
import { useAuth0 } from "@auth0/auth0-react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faThumbsDown, faComment, faTrashAlt } from '@fortawesome/free-regular-svg-icons'


library.add( faEllipsisH, faThumbsUp, faThumbsDown, faComment, faTrashAlt);

const { getBikes } = API;

function App() {
  const {isAuthenticated } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [modalImage, setModalImage] = useState(null)
  // console.log(posts.data)

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
            {isAuthenticated ? <Post getPosts={getPosts} setModalImage={setModalImage}/> : <div/> }
            
          </Row>
          <Row>
          
            <DisplayPost modalImage={modalImage} setModalImage={setModalImage} getPosts={getPosts} posts={posts.data} />
          </Row>
        </Col>
        
      </Container>
      {modalImage && <Modal modalImage={modalImage} setModalImage={setModalImage}/>}
      
    </Router>
  );
}

export default App;
