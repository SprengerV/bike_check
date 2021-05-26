import React, { Component, useEffect, useState, useCallback } from 'react'
import { Accordion, Card, Button, FormControl, Carousel, CarouselItem } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Image } from "cloudinary-react";
import { like, delLike } from '../../controllers/api';
import { useAuth0 } from '@auth0/auth0-react';
import { getLikes } from '../../utils/API';

const DisplayPost = (props) => {
  const { isAuthenticated } = useAuth0;
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false)
  const [bike, setBike] = useState(props.post);

  const { user, getAccessTokenSilently } = useAuth0();
  
  const didLike = useCallback((likes) => {
    const did = likes.filter((item) => {
      return item.userId === user.sub;
    })
    did.length > 0
      ? setLiked(true)
      : setLiked(false);
  }, [user.sub]);

  useEffect(() => {
    setBike(props.post);
    getLikes(props.post.id)
      .then(res => {
        setLikes(res.data);
        didLike(res.data);
      });
  }, [bike, user.sub, props, didLike]);

  const likeClass = () => {
    return (
      liked
        ? 'primary'
        : 'danger'
    );
  };
  const likeHandler = () => {
    if (isAuthenticated) {
      const token = getAccessTokenSilently();
      if (liked === false) {
        like(user.sub, token, props.post.id);
        setLiked(true);
      }
      if (liked === true) {
        delLike(user.sub, token, props.post.id);
        setLiked(false)
      }
    }
  }
  

  return (
    <div>
      <Card>
        <Card.Header className='text-center bg-danger text-white'>
          { bike.title }
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-column justify-content-center">
            <Carousel fade className="displayCarousel">
              { bike.photos.map((photo, index) => (
                <CarouselItem className="d-flex justify-content-center">
                  <Image key={index}
                    className="displayPic d-block "
                    cloudName="dply85wun"
                    publicId={photo.url} 
                    alt={index}
                    style={{ height: '600px' }}
                  />
                </CarouselItem>
              )) }
            </Carousel>
            <div>
              <div className="row">
                <div className="col-2 row">
                  <h3>{ bike.user.userName }</h3>
                  <div className="col-5">
                    <Button onClick={ likeHandler }variant={ likeClass }>Like</Button>
                    <p className="likeCount">{ likes.length }</p>
                  </div>
                </div>
                <div className="col-10">
                  <p>{ bike.body }</p>
                </div>
              </div>
              <Accordion defaultActiveKey='0'>
                <Accordion.Toggle as={Button} eventKey='0'>
                  Comment
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <FormControl as="textarea" rows="5" placeholder="Your comment..." />
                </Accordion.Collapse>
              </Accordion>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DisplayPost;

// class DisplayPost extends Component {

//   state = {
//     bike: []
//   }

//   componentDidMount() {
//     this.setState({ bike: this.props.post })
//     }
//   componentDidUpdate(prevProps) {
//     if (prevProps.post !== this.props.post) {
//       this.setState({ bike: this.props.post });
//     }
//   }
//   const likeHandler = () => {

//   };


//   render() {
//     return (
//       <div>
//         <Card>
//           <Card.Header className='text-center bg-danger text-white'>
//             {this.state.bike.title}
//           </Card.Header>
//           <Card.Body>
//             <div className="d-flex flex-column justify-content-center">
//               <Carousel fade className="displayCarousel">
//                 {this.state.bike.photos.map((photo, index) => (
//                   <CarouselItem className="d-flex justify-content-center">
//                     <Image key={index}
//                       className="displayPic d-block "
//                       cloudName="dply85wun"
//                       publicId={photo.url} 
//                       alt={index}
//                       style={{ height: '600px' }}
//                     />
//                   </CarouselItem>
//                 ))}
//               </Carousel>
//               <div>
//                 <div className="row">
//                   <div className="col-2 row">
//                     <h3>{this.state.bike.user.userName}</h3>
//                     <div className="col-5">
//                       <Button onClick={  }variant="danger">Like</Button>
//                       <p className="likeCount">15</p>
//                     </div>
//                   </div>
//                   <div className="col-10">
//                     <p>{this.state.bike.body}</p>
//                   </div>
//                 </div>
//                 <Accordion defaultActiveKey='0'>
//                   <Accordion.Toggle as={Button} eventKey='0'>
//                     Comment
//                   </Accordion.Toggle>
//                   <Accordion.Collapse eventKey='0'>
//                     <FormControl as="textarea" rows="5" placeholder="Your comment..." />
//                   </Accordion.Collapse>
//                 </Accordion>
//               </div>
//             </div>
//           </Card.Body>
//         </Card>
//       </div>
//     )
//   }
// }

// export default DisplayPost;