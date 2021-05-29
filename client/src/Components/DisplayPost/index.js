import React, { useEffect, useState } from 'react'
import { Accordion, Card, Button, FormControl, Carousel, CarouselItem, Dropdown } from 'react-bootstrap';
import { Image } from "cloudinary-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";
import jwt from 'jwt-decode'
import axios from 'axios';

const DisplayPost = (props) => {
    const [ bikes, setBikes ] = useState([]);
    const [ permissions, setPermissions ] = useState([]);
    const { user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if(props.posts){
            setBikes(props.posts);
        }

        const fetchToken = async () => {
            const token = await getAccessTokenSilently();
            const { permissions } = jwt(token);
            setPermissions(permissions);
        }
        fetchToken();
    }, [props.posts, getAccessTokenSilently]);

    const deletePost = async (postId) => {
        const token = await getAccessTokenSilently();
        axios.delete(`api/bikes/${postId}`,{
            headers: {'Authorization': `Bearer ${token}`}
        }).then(() => {
            props.getPosts();
        });
    };
       
    return (
        <div>
            {bikes.map((bike, index) => (
                <Card key={index}>
                    <Card.Header id={bike.id} className='bg-danger text-white'>
                            <div className='d-flex flex-row justify-content-between'>
                            <div></div>
                            <div>{bike.title + " " + permissions}</div>
                            <div>
                                {(user?.sub === bike?.userId || permissions.includes("admin")) ? 
                                <div className="dropdown">
                                    <FontAwesomeIcon style={{cursor: "pointer"}} classid="dropdownMenuButton1" data-bs-toggle="dropdown" icon={faEllipsisH}/>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li key={1} onClick={() => {deletePost(bike.id)}}><a className="dropdown-item" href="#">Delete</a></li>
                                    </ul>
                                </div> : <div></div>}
                            </div>
                              
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex flex-column justify-content-center">
                            <Carousel fade className="displayCarousel">

                                {bike.photos.map((photo, index) => (
                                    <CarouselItem  onClick={()=> props.setModalImage(photo.url)}className="d-flex justify-content-center">
                                        <Image key={index}
                                            className="displayPic d-block "
                                            cloudName="dply85wun"
                                            publicId={photo.url} 
                                            alt={index}
                                            style={{ height: '600px' }}
                                                />
                                    </CarouselItem>
                                ))}

                            </Carousel>
                            <div>
                                <div className="row">
                                    <div className="col-2 row">
                                        <h3>{bike.user.userName}</h3>
                                        <div className="col-5">
                                            <Button variant="danger">Like</Button>
                                            <p className="likeCount">15</p>
                                        </div>
                                        <div className="col-5">
                                            <Button variant="danger">Dislike</Button>
                                            <p className="dislikeCount">2</p>
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <p>{bike.body}</p>
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
            ))
            }
        </div>
    )

}

export default DisplayPost;