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



const Home = ({setModalImage, modalImage}) => {
    const { isAuthenticated } = useAuth0();
    const [posts, setPosts] = useState([]);
   
    // console.log(posts.data)
  
    const getPosts = (cat) => {
      API.getBikes(cat)
        .then(res => setPosts(res))
        .catch(err => setPosts([err]));
    }

  
    useEffect(() => {
      if (posts.length === 0) getPosts();
    }, [posts]);

    // console.log(posts)


    return (
        <Container className="row" fluid={true}>
        <Col md="2" xs="12">
          <SideBar getPosts={getPosts} />
        </Col>
        <Col xs="12" md="10">
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