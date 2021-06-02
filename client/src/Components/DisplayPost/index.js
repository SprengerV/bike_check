import React, { useEffect, useState } from 'react'
import { Accordion, Card, Button, FormControl, Carousel, CarouselItem } from 'react-bootstrap';

import { Image } from "cloudinary-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";
import moment from 'moment';
import jwt from 'jwt-decode';
import axios from 'axios';
import "./style.css"

const DisplayPost = (props) => {
    const [bikes, setBikes] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [commentText, setCommentText] = useState("");
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (props.posts) {
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
        axios.delete(`api/bikes/${postId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(() => {
            props.getPosts();
        });
    };

    const postComment = async (bikeId) => {
        if (commentText) {
            const token = await getAccessTokenSilently();
            axios.post('/api/comments', {
                bikeId: bikeId,
                body: commentText
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(() => {
                setCommentText("");
                props.getPosts();
            });
        }
    }

    const deleteComment = async (commentId) => {
        const token = await getAccessTokenSilently();
        axios.delete(`/api/comments/${commentId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(() => {
            props.getPosts();
        });
    };

    const updateLike = async (bikeId, likes) => {
        const token = await getAccessTokenSilently();

        if (likes.some((like) => like.userId === user.sub)) {
            axios.delete(`/api/likes/${bikeId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(() => {
                props.getPosts();
            });
        } else {
            axios.post('/api/likes', {
                bikeId: bikeId
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(() => {
                props.getPosts();
            });
        }
    }

    const updateDislike = async (bikeId, dislikes) => {
        const token = await getAccessTokenSilently();

        if (dislikes.some((dislike) => dislike.userId === user.sub)) {
            axios.delete(`/api/dislikes/${bikeId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(() => {
                props.getPosts();
            });
        } else {
            axios.post('/api/dislikes', {
                bikeId: bikeId
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(() => {
                props.getPosts();
            });
        }
    }

    const getDuration = (time) => {
        const duration = moment.duration(moment().diff(moment(time)));
        switch (true) {
            case (duration.asSeconds() < 60):
                return `${duration.seconds()}s`;
            case (duration.asMinutes() < 60):
                return `${duration.minutes()}m`;
            case (duration.asHours() < 24):
                return `${duration.hours()}h`;
            case (duration.asDays() < 7):
                return `${duration.hours()}h`;
            default:
                return `${duration.weeks()}w`;
        }
    }

    return (

        <div>

            { bikes && bikes.map((bike, index) => (
                <Card className="displayCard" key={index}>
                    <div className="">
                        <h2 className="dispPostTitle">{bike.title}</h2>
                        <Carousel fade className="displayCarousel">
                            {bike.photos.map((photo, index) => (
                                <CarouselItem onClick={() => props.setModalImage(photo.url)} className="d-flex justify-content-center">
                                    <Image key={index}
                                        className="displayPic d-block "
                                        cloudName="dply85wun"
                                        publicId={photo.url}
                                        alt={index}
                                    />
                                </CarouselItem>
                            ))}

                        </Carousel>
                        <div className="container">
                            <div className="row">

                                <div className="userNameLikes col-md-3 col-xs-12 ">
                                    <div className='row'>
                                        <h3><a className="postUserName" href={`/user/${bike.userId}`} >{bike.user.userName}</a></h3>
                                        {(user?.sub === bike?.userId || permissions.includes("admin")) &&
                                            <div className="deleteDrop dropdown">
                                                <FontAwesomeIcon style={{ cursor: "pointer" }} classid="dropdownMenuButton1" size="lg" data-bs-toggle="dropdown" icon="ellipsis-h" />
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li key={1} onClick={() => { deletePost(bike.id) }}><span className="dropdown-item" >Delete</span></li>
                                                </ul>
                                            </div>}
                                    </div>
                                    <div className="row">
                                        <div className="col-6" style={{ cursor: "pointer" }} onClick={() => { updateLike(bike.id, bike.likes) }}> {bike.likes.some((like) => like.userId === user?.sub) ? <FontAwesomeIcon icon={faThumbsUp} size="lg" /> : <FontAwesomeIcon size="lg" icon={["far", "thumbs-up"]} />} {bike.likes.length || " "}</div>
                                        <div className="col-6" style={{ cursor: "pointer" }} onClick={() => { updateDislike(bike.id, bike.dislikes) }}> {bike.dislikes.some((dislike) => dislike.userId === user?.sub) ? <FontAwesomeIcon size="lg" icon={faThumbsDown} /> : <FontAwesomeIcon size="lg" icon={["far", "thumbs-down"]} />} {bike.dislikes.length || " "}</div>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <textarea readOnly={true} className='bodyDisplay' value={bike.body}/>
                                </div>
                            </div>
                            <Accordion>
                                <div className="d-flex flex-row justify-content-between align-items-center">

                                    <div style={{ cursor: "pointer" }}>
                                        <Accordion.Toggle className="commentIcon" style={{ textDecoration: "none", color: "#000000", padding: 0 }} as={Button} variant="link" eventKey='0'>
                                            <FontAwesomeIcon size="lg" icon={["far", "comment"]} /> {bike.comments.length || 0}
                                        </Accordion.Toggle>
                                    </div>
                                </div>
                                <Accordion.Collapse eventKey='0'>
                                    <div>
                                        {isAuthenticated && 
                                        <div className="d-grid gap-2">
                                            <FormControl style={{ marginTop: "12px" }} value={commentText} onChange={e => setCommentText(e.target.value)} as="textarea" rows="3" placeholder="Write a comment..." />
                                            <button className="postCommentBtn"style={{ marginBottom: "12px" }} size="sm" onClick={() => { postComment(bike.id) }} block>Post</button>
                                        </div>
                                        }
                                        <Card>
                                            <Card.Header>Comments • {bike.comments.length || 0}</Card.Header>
                                            {bike.comments.sort((a, b) => { return moment(b.created_at) - moment(a.created_at) }).map((comment, index) => (
                                                <Card key={index} style={{ margin: "12px" }}>
                                                    <Card.Header className="d-flex flex-row justify-content-between">
                                                        <div>{comment.user.userName}</div>

                                                        <div>{getDuration(comment.created_at)}{(user?.sub === comment?.userId || permissions.includes("admin")) ? <span style={{ cursor: "pointer" }} onClick={() => { deleteComment(comment.id) }}> • <FontAwesomeIcon icon={["far", "trash-alt"]} /></span> : <span></span>}</div>
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

                </Card>
            ))
            }


        </div>
    )

}

export default DisplayPost;