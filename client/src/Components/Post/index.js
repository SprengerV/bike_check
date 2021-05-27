import React, { useState } from 'react'
import { Col, Container, Accordion, Card, Button, DropdownButton, Dropdown, FormControl, Carousel, Input } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Axios from "axios";
import { Image } from "cloudinary-react";
import API from "../../utils/API";
import {useAuth0} from "@auth0/auth0-react"

const Post = () => {

    const {user} = useAuth0();

    const [imageSelected, setImageSelected] = useState("")
    const [postTitle, setPostTitle]= useState("");
    const [postBody, setPostBody]= useState("");
    const [categorySelected, setCategorySelected]= useState("");
    


    const uploadImage = () => {
        const photoData = new FormData();
        photoData.append('file', imageSelected);
        photoData.append("upload_preset", "fnin4syl");




        Axios.post(
            "https://api.cloudinary.com/v1_1/dply85wun/image/upload",
            photoData
        ).then((data) => {


            Axios.post(
                "api/bikes",
                {
                    title: postTitle,
                    body: postBody,
                    category: categorySelected,
                    userId: user.sub
                }
            ).then((response) => {
                
                Axios.post(
                    "api/photos",
                    {
                        url: data.data.url,
                        userId: user.sub,
                        bikeId: response.data.id
                    }
                ).then((res) => {
                    console.log(res)
                    window.location.reload()
                })
            })

        })
    }

    // console.log(postTitle)





    return (
        <Col xs="10" className="ms-auto me-auto">
            <Accordion defaultActiveKey='0'>
                <Card>
                    <Card.Header className='text-center bg-danger text-white'>
                        <Accordion.Toggle as={Button} eventKey='1'>
                            Post
                            </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey='1'>
                        <Card.Body className="row">
                            <Container className="col-3 d-flex flex-column justify-content-center">
                                <label for="Category">Category</label>
                                <select id="SelectCategory" title="Category" variant="outline-danger"
                                    onChange={(event) => {
                                        setCategorySelected(event.target.value)
                                    }}>
                                    <option disabled selected >Select One</option>
                                    <option>Mountain</option>
                                    <option>Road</option>
                                    <option>Gravel</option>
                                    <option>Touring</option>
                                    <option>BMX</option>
                                    <option>Commuter</option>
                                    <option>Custom Builds</option>
                                    <option>Vintage</option>
                                </select>
                                <br />
                                <label for="files" className="photoUploadBtn btn text-center p-2">Select Images</label>
                                <input style={{ visibility: 'hidden' }} id="files" type="file" onChange={(event) => {
                                    setImageSelected(event.target.files[0]);
                                }} />
                                <br />
                                <br />
                                <Button variant="danger" onClick={uploadImage} >Post</Button>
                            </Container>
                            <Container className="col-9">
                                <FormControl id="postTitle" placeholder="Title" onChange={(event) => {
                                    setPostTitle(event.target.value)
                                }} />
                                <br />
                                <FormControl as="textarea" rows="5" placeholder="About your bike..." onChange={(event) => {
                                    setPostBody(event.target.value)
                                }} />
                            </Container>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Col>
    )
}

export default Post;
