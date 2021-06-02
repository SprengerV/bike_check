import React, {useState, useEffect} from 'react'

import Post from '../Post/index'
import SideBar from '../SideBar/index';
import DisplayPost from '../DisplayPost/index';
import Modal from '../Modal'


import { Row, Col, Container } from 'react-bootstrap';
import API from '../../utils/API';
import { useAuth0 } from "@auth0/auth0-react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faThumbsDown, faComment, faTrashAlt } from '@fortawesome/free-regular-svg-icons'



library.add(faEllipsisH, faThumbsUp, faThumbsDown, faComment, faTrashAlt);



const Category = props => {
    const { isAuthenticated } = useAuth0();
    const [posts, setPosts] = useState([]);
    const [modalImage, setModalImage] = useState(null)
    console.log(posts);

  
    const getPosts = (category) => {
        if (category) {
          
          API.getBikesCat(category).then((data) => setPosts(data.data))
        } else {
          
          API.getBikesCat(props.match.params.category).then((data) => setPosts(data.data))
        }
        
    }

  
    useEffect(() => {
      if (posts.length === 0) {
          getPosts(props.match.params.category);
          console.log(posts)
      }
    }, [posts]);



    return (
        <Container className="row" fluid={true}>
        <Col xs="2">
          <SideBar getPosts={getPosts}/>
        </Col>
        <Col md="10">
          <Row>
            {isAuthenticated ? <Post getPosts={getPosts} setModalImage={setModalImage} /> : <div />}

          </Row>
          <Row>
            {posts && <DisplayPost modalImage={modalImage} setModalImage={setModalImage} getPosts={getPosts} posts={posts} />}
          </Row>
        </Col>
        {modalImage && <Modal modalImage={modalImage} setModalImage={setModalImage} />}
        
      </Container>
    )

}

export default Category;