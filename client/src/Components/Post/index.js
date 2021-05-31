import React, { useState, useRef } from 'react'
import { Col, Container, Accordion, Card, Button,  FormControl } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"

const Post = ({ setModalImage, getPosts }) => {

    const { getAccessTokenSilently } = useAuth0();

    const [imageSelected, setImageSelected] = useState("")
    const [returnedImages, setReturnedImages] = useState([]);
    const [previewSource, setPreviewSource] = useState([]);
    let titleRef= useRef()
    let bodyRef= useRef()
    let categoryRef = useRef();
    let accordionRef = useRef();
    
    
    // console.log(imageSelected);
    // console.log(imageSelected);
    
    // console.log(returnedImages);

  

    const handleChangeEvent = (e) => {
        const file = e.target.files[0];
        setImageSelected(arr => [...arr, file])

        previewFile(file)
        console.log(imageSelected)
    }


    // console.log(imageSelected);
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(arr => [...arr, reader.result])
        }
    }

    const uploadImage = ((e) => {


        const photoData = new FormData();

        photoData.append('file', e.target.files[0]);
        photoData.append("upload_preset", "fnin4syl");

         Axios.post(
            "https://api.cloudinary.com/v1_1/dply85wun/image/upload",
            photoData
        ).then((data) => {
            setReturnedImages(arr=> [...arr, data])
        })

    });







    const uploadPost = async () => {

       

        if (bodyRef.current.value && returnedImages && titleRef.current.value && categoryRef.current.value) {

           

            const token = await getAccessTokenSilently();
         


            Axios.post(
                "api/bikes",
                {
                    title: titleRef.current.value,
                    body: bodyRef.current.value,
                    category: categoryRef.current.value,
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            ).then((response) => {

                returnedImages.map(async (image) => {

                    Axios.post(
                        "api/photos",

                        {
                            url: image.data.url,
                            // userId: user.sub,
                            bikeId: response.data.id
                        },
                        {
                            headers: { 'Authorization': `Bearer ${token}` }
                        }
                    ).then(
                        getPosts("all"),

                        titleRef.current.value = "",
                        bodyRef.current.value = "",
                        categoryRef.current.value = "",
                        setReturnedImages([]),
                        
                        
                        


                    )
                       
                })
            })
        }

    }


    // console.log(postTitle)





    return (
        <Col xs="12" className="ms-auto me-auto">
            <Accordion  defaultActiveKey='0'>
                <Card>

                    <Card.Header className='text-center bg-danger text-white'>
                        <Accordion.Toggle as={Button} eventKey='1'>
                            Make a Post!
                            </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse ref={accordionRef} eventKey='1'>
                        <Card.Body className="row">
                            <Container className="col-3 d-flex flex-column justify-content-center">

                                <label for="Category">Category</label>
                                <select id="SelectCategory" title="Category" ref={categoryRef} variant="outline-danger">
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
                                <input style={{ visibility: 'hidden' }} id="files" type="file" onChange={(e) => uploadImage(e)} />
                                <div className="row">
                                    {returnedImages && (returnedImages.map((image, index) => (
                                        <div className="col-2" onClick={() => setModalImage(image.data.url)}>
                                            <img className="previewImages" key={index} src={image.data.url} />
                                        </div>
                                    )))}
                                </div>
                                <br />
                                <Button type="button" variant="danger" eventKey='0' onClick={uploadPost} >Post</Button>
                            </Container>
                            <Container className="col-9">
                                <FormControl id="postTitle" ref={titleRef} placeholder="Title" />
                                <br />
                                <FormControl as="textarea" rows="5" ref={bodyRef} placeholder="About your bike..." />
                            </Container>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Col>
    )
}

export default Post;
