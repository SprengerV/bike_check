import React, { useState, useRef } from 'react'
import { Col, Container, Accordion, Card, Button,  FormControl, Spinner } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"
import "./style.css"

const Post = ({ setModalImage, getPosts }) => {

    const { getAccessTokenSilently } = useAuth0();

    const [ returnedImages, setReturnedImages ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    let titleRef= useRef()
    let bodyRef= useRef()
    let categoryRef = useRef();
    let accordionRef = useRef();
    
    
    
    const uploadImage = async (e) => {


        const photoData = new FormData();

        photoData.append('file', e.target.files[0]);
        photoData.append("upload_preset", "fnin4syl");
        setLoading(true)
        try {
         const data = await Axios
            .post("https://api.cloudinary.com/v1_1/dply85wun/image/upload",
            photoData
        ).then((data) => {
            setReturnedImages(arr=> [...arr, data])
            setLoading(false)
        })
        
    } catch (e) {
        console.log(e);
    }

    };

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

                returnedImages.map((image) => {

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
                <Card className="postCard">
                    <Accordion.Collapse ref={accordionRef} eventKey='1'>
                        <Card.Body className="row">
                            <Container className="col-3 d-flex flex-column justify-content-center">

                                <label className="categoryLabel" for="Category">Category</label>
                                <select className="categorySelect" id="SelectCategory" title="Category" ref={categoryRef} >
                                    <option disabled defaultValue >Select One</option>
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
                                
                                <div className="spinnerRow row">
                                {loading && <Spinner className="spinner" animation="border"/> }
                                    {returnedImages && (returnedImages.map((image, index) => (
                                        <div className="prevImageDiv col-3" onClick={() => setModalImage(image.data.url)}>
                                            <img className="previewImages" key={index} src={image.data.url} />
                                        </div>
                                    )))}
                                </div>
                                <button className="postButton" type="button" eventKey='0' onClick={uploadPost} >Post</button>
                            </Container>
                            <Container className="col-9">
                                <FormControl id="postTitle"  ref={titleRef} placeholder="Title" />
                                <br />
                                <FormControl as="textarea" id="postBio" rows="5" ref={bodyRef} placeholder="About your bike..." />
                            </Container>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Card.Header className='text-center postHeader'>
                        <Accordion.Toggle className="makePostBtn"  eventKey='1'>
                            Make a Post!
                            </Accordion.Toggle>
                    </Card.Header>
                </Card>
            </Accordion>
        </Col>
    )
}

export default Post;
