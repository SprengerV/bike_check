import React, { Component, useEffect, useState } from 'react'
import { Accordion, Card, Button, FormControl, Carousel, CarouselItem } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Image } from "cloudinary-react";
import API from '../../utils/API';
import { useAuth0 } from '@auth0/auth0-react';

const { like, delLike } = API;

const DisplayPost = (props) => {
  const [bike, setBike] = useState(props.post);
  const [liked, setLiked] = useState(false);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setBike(props.post);
    setLiked(props.post.likes.some(({ userId }) => userId.includes(user.sub)));
  }, [user, props]);

  const likeHandler = () => {
    getAccessTokenSilently()
      .then(token => {  
        console.log(token)
        liked
          ? delLike(user.sub, token, bike.id)
            .then(res => setLiked(res.status !== "ok"))
            .catch(err => console.log(err))
          : like(user.sub, token, bike.id)
            .then(res => setLiked(res.status === "ok"))
            .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };  

  return (
    <div>
      <Card>
        <Card.Header className='text-center bg-danger text-white'>
          { bike.title }
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-column justify-content-center">
            <Carousel fade className="displayCarousel">
              { bike.photos && bike.photos.map((photo, index) => (
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
                  <h3>{ bike.user && bike.user.userName }</h3>
                  <div className="col-5">
                    { isAuthenticated ? <Button onClick={ likeHandler } id={ `like${props.post.id}` } variant={ liked ? 'primary' : 'danger' }>Like</Button> : <div/> }
                    <p className="likeCount">{ bike.likes && bike.likes.length }</p>
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