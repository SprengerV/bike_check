import React, {useState, useEffect} from 'react'

import Post from '../Post/index'
import SideBar from '../SideBar/index';
import DisplayPost from '../DisplayPost/index';



import { Row, Col, Container } from 'react-bootstrap';
import API from '../../utils/API';
import { useAuth0 } from "@auth0/auth0-react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faThumbsDown, faComment, faTrashAlt } from '@fortawesome/free-regular-svg-icons'



library.add(faEllipsisH, faThumbsUp, faThumbsDown, faComment, faTrashAlt);

const { getBikes } = API;

const Home = ({setModalImage, modalImage}) => {
    const { isAuthenticated } = useAuth0();
    const [posts, setPosts] = useState([]);
   
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
        <Container className="row" fluid={true}>
        <Col xs="2">
          <SideBar func={getPosts} />
        </Col>
        <Col cs="10">
          <Row>
            {isAuthenticated ? <Post getPosts={getPosts} setModalImage={setModalImage} /> : <div />}

          </Row>
          <Row>
            {posts && <DisplayPost modalImage={modalImage} setModalImage={setModalImage} getPosts={getPosts} posts={posts.data} />}
          </Row>
        </Col>
        
      </Container>
    )

}

export default Home;