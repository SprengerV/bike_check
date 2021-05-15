import React from 'react'
import {Container, Accordion, Card, Button, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Post = () => {
    return (
        <Container className="row" fluid={true}>
            <Container className="col-2">
                <Card>
                    <Card.Header>
                        Categories
                    </Card.Header>
                </Card>
            </Container>
            <Container className="col-10">
            <Accordion defaultActiveKey='0'>
                    <Card>
                        <Card.Header className='text-center bg-danger text-white'>
                            <Accordion.Toggle as={Button} eventKey='0'>
                                Open!
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey='0'>
                            <Card.Body className="row">
                                <Container className="col-3 d-flex flex-column justify-content-center">
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
                                    <br></br>
                                    <Button variant="danger">Upload Image</Button>
                                    <br></br>
                                    <br></br>
                                    <Button variant="danger">Post</Button>
                                </Container>
                                <Container className="col-9">
                                    <FormControl placeholder="Title"/>
                                    <br></br>
                                    <FormControl as="textarea" rows="5" placeholder="About your bike..."/>
                                </Container>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Container>

        </Container>
    )
}

export default Post
