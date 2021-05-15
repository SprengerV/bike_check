import React from 'react'
import {Container, Accordion, Card, Button, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Post = () => {
    return (
        <Container className="row" fluid={true}>
            <Container className="col-2">
              
            </Container>
            <Container className="col-10">
            <Accordion defaultActiveKey='0'>
                    <Card>
                        <Card.Header className='text-center bg-danger text-white'>
                            <Accordion.Toggle as={Button} eventKey='0'>
                                Open!
                            </Accordion.Toggle>
                        </Card.Header>
                        
                    </Card>
                </Accordion>
            </Container>

        </Container>
    )
}

export default Post
