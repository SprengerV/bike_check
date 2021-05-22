import React, { useState } from 'react'
import { Col, Container, Accordion, Card, Button, DropdownButton, Dropdown, FormControl, Carousel, Input } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Axios from "axios";
import {Image} from "cloudinary-react";
import API from "../../utils/API";

const Post = () => {
    const [imageSelected, setImageSelected] = useState("")

    const uploadImage = () => {
        const formData = new FormData;
        formData.append('file', imageSelected);
        formData.append("upload_preset", "fnin4syl");
  
        Axios.post(
            "https://api.cloudinary.com/v1_1/dply85wun/image/upload",
            formData
        ).then((response) => {
            console.log(response);
        });
    }

    return (
        <Col xs="10" className="ms-auto me-auto">
            <Accordion defaultActiveKey='0'>
                <Card>
                    <Card.Header className='text-center bg-danger text-white'>
                        <Accordion.Toggle as={Button}  eventKey='1'>
                            Post
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey='1'>
                        <Card.Body className="row">
                            <Container className="col-3 d-flex flex-column justify-content-center">
                                <label for="category">Category</label>
                                <DropdownButton id="SelectCategory" title="Category" variant="outline-danger">
                                    <Dropdown.Item>Mountain</Dropdown.Item>
                                    <Dropdown.Item>Road</Dropdown.Item>
                                    <Dropdown.Item>Gravel</Dropdown.Item>
                                    <Dropdown.Item>Touring</Dropdown.Item>
                                    <Dropdown.Item>BMX</Dropdown.Item>
                                    <Dropdown.Item>Commuter</Dropdown.Item>
                                    <Dropdown.Item>Custom Builds</Dropdown.Item>
                                    <Dropdown.Item>Vintage</Dropdown.Item>
                                </DropdownButton>
                                <br/>
                                <label for="files" className="photoUploadBtn btn text-center p-2">Select Images</label>
                                <input style={{visibility:'hidden'}} id="files" type="file"  onChange={(event) => {
                                    setImageSelected(event.target.files[0]);
                                }} />
                                <br/>
                                <br/>
                                <Button variant="danger" onClick={uploadImage} >Post</Button>
                            </Container>
                            <Container className="col-9">
                                <FormControl placeholder="Title" />
                                <br/>
                                <FormControl as="textarea" rows="5" placeholder="About your bike..." />
                            </Container>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Col>
    )
}

export default Post;
