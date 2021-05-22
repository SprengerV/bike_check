import React, { useState } from 'react'
import { Container, Accordion, Card, Button, DropdownButton, Dropdown, FormControl, Carousel, Input } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Axios from "axios";
import DipslayPost from "../DisplayPost/index"
import {Image} from "cloudinary-react";
import API from "../../utils/API";
import DisplayPost from '../DisplayPost/index';

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
        })

    }
   
    

    return (
        <Container className="row" fluid={true}>
            <Container className="col-2">
                <Card>
                    <Card.Header>
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
                            <Accordion.Toggle as={Button} eventKey='0'>
                                Post
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey='0'>
                            <Card.Body className="row">
                                <Container className="col-3 d-flex flex-column justify-content-center">
                                    <label for="category">Category</label>
                                    <DropdownButton title="Category" variant="outline-danger">
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
                <DisplayPost/>
            </Container>

        </Container>
    )
}

export default Post
