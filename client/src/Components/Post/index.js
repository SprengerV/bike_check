import React, { useEffect, useState } from 'react'
import { Container, Accordion, Card, Button, FormControl } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
// import DipslayPost from "../DisplayPost/index"
import DisplayPost from '../DisplayPost/index';
import { useAuth0 } from '@auth0/auth0-react';
import Axios from 'axios';


const Post = () => {

    const { getAccessTokenSilently, user } = useAuth0();

    // useEffect(() => {

    //     const GetMetadata = async () => {
    //         // const { getAccessTokenSilently, user} = useAuth0();
    //         // console.log(user);
    //         const token = await getAccessTokenSilently({scope: `read:${user.sub}`});
    //         // console.log(token);
    //     }

    //     GetMetadata();

    // });



    // console.log(user.sub)

    const [imageSelected, setImageSelected] = useState("");
    const [categorySelected, setCategorySelected] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [postId, setPostId] = useState("");
    const [url, setUrl] = useState("");


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
                setPostId(response.data.id)
                console.log(postId)
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
        <Container className="row" fluid={true}>
            <Container className="col-2">
                <Card>
                    <Card.Header className="categoryHeader">
                        Categories
                    </Card.Header>
                    <Card.Body>
                        <Button variant="light">Mountain</Button><br></br>
                        <Button variant="light">Road</Button><br></br>
                        <Button variant="light">Gravel</Button><br></br>
                        <Button variant="light">Touring</Button><br></br>
                        <Button variant="light">BMX</Button><br></br>
                        <Button variant="light">Commuter</Button><br></br>
                        <Button variant="light">Custom Builds</Button><br></br>
                        <Button variant="light">Vintage</Button><br></br>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="col-10">
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
                <DisplayPost />
            </Container>

        </Container>
    )
}

export default Post
