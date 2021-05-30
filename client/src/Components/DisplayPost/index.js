import React, { useEffect, useState } from 'react'
import { Accordion, Card, Button, FormControl, Carousel, CarouselItem, Dropdown } from 'react-bootstrap';
import { Image } from "cloudinary-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";
import jwt from 'jwt-decode'
import axios from 'axios';

const DisplayPost = (props) => {
    const [ bikes, setBikes ] = useState([]);
    const [ permissions, setPermissions ] = useState([]);
    const [ commentText, setCommentText ] = useState("");
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

    const postComment = async (bikeId) => {
        if(commentText){
            const token = await getAccessTokenSilently();
            axios.post('api/comments/', {
                bikeId: bikeId,
                body: commentText
            }, {
                headers: {'Authorization': `Bearer ${token}`}
            }).then(() => {
                setCommentText("");
                props.getPosts();
            });
        }
    }

    const deleteComment = async (commentId) => {
        const token = await getAccessTokenSilently();
        axios.delete(`api/comments/${commentId}`,{
            headers: {'Authorization': `Bearer ${token}`}
        }).then(() => {
            props.getPosts();
        });
    };

    const updateLike = async (bikeId, likes) => {
        const token = await getAccessTokenSilently();

        if(likes.some((like) => like.userId === user.sub)) {
            axios.delete(`api/likes/${bikeId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            }).then(() => {
                props.getPosts();
            });
        } else {
            axios.post('api/likes/', {
                bikeId: bikeId
            }, {
                headers: {'Authorization': `Bearer ${token}`}
            }).then(() => {
                props.getPosts();
            });
        }
    }
       
    return (
        <div>
            {bikes.map((bike, index) => (
                <Card key={index}>
                    <Card.Header id={bike.id} className='bg-danger text-white'>
                            <div className='d-flex flex-row justify-content-between'>
                            <div></div>
                            <div>{bike.title}</div>
                            <div>
                                {(user?.sub === bike?.userId || permissions.includes("admin")) ? 
                                <div className="dropdown">
                                    <FontAwesomeIcon style={{cursor: "pointer"}} classid="dropdownMenuButton1" data-bs-toggle="dropdown" icon="ellipsis-h"/>
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
                                    </div>
                                    <div className="col-10">
                                        <p>{bike.body}</p>
                                    </div>
                                </div>
                                <Accordion>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <div style={{cursor: "pointer"}} onClick={() => {updateLike(bike.id, bike.likes)}}> {bike.likes.some((like) => like.userId === user?.sub) ? <FontAwesomeIcon icon={faThumbsUp}/> : <FontAwesomeIcon icon={["far", "thumbs-up"]}/>} {bike.likes.length || " "}</div>
                                        <div style={{cursor: "pointer"}}> <FontAwesomeIcon icon={["far", "thumbs-down"]}/></div>
                                        <div style={{cursor: "pointer"}}>
                                            <Accordion.Toggle style={{textDecoration: "none", color: "#000000", padding: 0}} as={Button} variant="link" eventKey='0'>
                                                <FontAwesomeIcon icon={["far","comment"]}/> {bike.comments.length || 0}
                                            </Accordion.Toggle>
                                        </div>
                                    </div>
                                    <Accordion.Collapse eventKey='0'>
                                        <div>
                                            <div className="d-grid gap-2">
                                                <FormControl style={{marginTop: "12px"}} value={commentText} onChange={e => setCommentText(e.target.value )} as="textarea" rows="3" placeholder="Write a comment..." />
                                                <Button style={{marginBottom: "12px"}} size="sm" onClick={() => {postComment(bike.id)}} block>Post</Button>
                                            </div>
                                            <Card>
                                                <Card.Header>Comments • {bike.comments.length || 0}</Card.Header>
                                                {bike.comments.map((comment, index) => (
                                                    <Card key={index} style={{margin: "12px"}}>
                                                        <Card.Header className="d-flex flex-row justify-content-between">
                                                            <div>{comment.user.userName}</div>
                                                            <div></div>
                                                            {(user?.sub === comment?.userId || permissions.includes("admin")) ? <div style={{cursor: "pointer"}} onClick={() => {deleteComment(comment.id)}}><FontAwesomeIcon icon={["far", "trash-alt"]}/></div> : <div></div>}
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Card.Text>{comment.body}</Card.Text>
                                                        </Card.Body>
                                                    </Card> 
                                                ))}
                                            </Card>
                                        </div>
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