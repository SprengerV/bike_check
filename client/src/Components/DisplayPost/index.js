import React, { Component } from 'react'
import { Accordion, Card, Button, FormControl, Carousel, CarouselItem } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Image } from "cloudinary-react";


class DisplayPost extends Component {

    state = {
        bikes: []
    }

    componentDidMount() {
        this.setState({ bikes: [] })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.posts !== this.props.posts) {
            this.setState({ bikes: this.props.posts });
        }
    }


    render() {
        return (
            <div>
                {this.state.bikes.map((bike, index) => (
                    <Card key={index}>
                        <Card.Header className='text-center bg-danger text-white'>
                            {bike.title}
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex flex-column justify-content-center">
                                <Carousel fade className="displayCarousel">

                                    {bike.photos.map((photo, index) => (
                                        <CarouselItem className="d-flex justify-content-center">
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

}

export default DisplayPost;