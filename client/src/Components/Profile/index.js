import React, { useState, useEffect, useRef } from "react";
import Post from "../Post"
import API from '../../utils/API';
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";
import Axios from 'axios'


import { useAuth0 } from '@auth0/auth0-react';
import { Row, Col, Container } from 'react-bootstrap';
import DisplayPost from "../DisplayPost";




const Profile = (props) => {

    const { getUsers } = API;
    const { getAccessTokenSilently } = useAuth0();
    const [userInfo, setUserInfo] = useState([])
    const [editPost, setEditPost] = useState(false)
    const [bio, setBio] = useState('')
    let bioRef = useRef();
    let userNameRef = useRef();
    let locationRef = useRef()

    const [imageSelected, setImageSelected] = useState(null)
    const [previewSource, setPreviewSource] = useState(null);

    const handleChangeEvent = (e) => {
        const file = e.target.files[0];
        setImageSelected(file)

        previewFile(file)
        // console.log(imageSelected);
        // console.log(previewSource)
    }


    // console.log(imageSelected);
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const updateUser = async () => {

        const photoData = new FormData();

        const token = await getAccessTokenSilently();
        photoData.append('file', imageSelected);
        photoData.append("upload_preset", "fnin4syl");
        if (imageSelected) {
            try {
                const data = await Axios
                    .post("https://api.cloudinary.com/v1_1/dply85wun/image/upload",
                        photoData
                    ).then((data) => {

                        Axios.put(`api/user/${props.match.params.id}`,
                            {
                                UserName: userNameRef.current.value,
                                bio: bioRef.current.value,
                                location: locationRef.current.value,
                                avatar: data.data.url

                            },
                            {
                                headers: { 'Authorization': `Bearer ${token}` }
                            }
                        ).then((res) => {

                            userNameRef.current.value = ""
                            bioRef.current.value = ""
                            locationRef.current.value = ""
                            setPreviewSource(null);
                            setImageSelected(null);
                            setEditPost(false)
                            getPosts();
                        })
                    })

            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                const data = await Axios

                    .put(`api/user/${props.match.params.id}`,
                        {
                            UserName: userNameRef.current.value,
                            bio: bioRef.current.value,
                            location: locationRef.current.value,

                        },
                        {
                            headers: { 'Authorization': `Bearer ${token}` }
                        }
                    ).then((res) => {

                        userNameRef.current.value = ""
                        bioRef.current.value = ""
                        locationRef.current.value = ""
                        setPreviewSource(null);
                        setImageSelected(null);
                        setEditPost(false)
                        getPosts();
                    })

            } catch (e) {
                console.log(e)
            }
        }

    }

    const getPosts = () => {
        getUsers(props.match.params.id).then((data) => setUserInfo(data.data))
    }
    useEffect(() => {
        if (userInfo.length === 0) {
            getPosts()
        }
    })

    // console.log(userInfo);


    //    console.log(userInfo);

    return (
        <Container fluid={true} className="row ">
            {editPost ?
                <Col md="2">
                    <div className="profileDisplay card">
                        <div className="imageUploadDiv">

                            {previewSource ? <img alt='uploaded profile display' label className="profileImage card-img" src={previewSource} /> : <img label alt='filer' className="profileImage card-img" src={userInfo.avatar} />}
                        </div>
                        <label for="profilePic">
                            <FontAwesomeIcon className="imageIcon" icon={faFileImage} size="5x" />
                        </label>
                        <input className="profilePicInput imageIcon" style={{ visibility: "hidden" }} onChange={(e) => (handleChangeEvent(e))} type="file" id="profilePic" />

                        <div className=' row card-title'>
                            <input className='userNameInput text-center' ref={userNameRef} defaultValue={userInfo.userName} />
                        </div>
                        <div className="text-center card-body">
                            <div className='row locationDiv card-text'>
                                <label className="col-12" for="location">Location </label>
                                <input type='location' ref={locationRef} defaultValue={userInfo.location} className="locationInput" id='location' placeholder="city, state" />

                            </div>
                            <div className='row bioDiv card-text'>
                                <label className="col-12" for="bio">Bio</label>
                                <textarea maxlength="250" ref={bioRef} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself!" defaultValue={userInfo.bio} className="bioInput" id='bio' />
                                <p className="text-left" >{bio.length}/250</p>
                            </div>
                            <div className="editButtonDiv">
                                <button className="editSave" onClick={updateUser}>Save</button>
                            </div>


                        </div>

                    </div>

                </Col>
                :
                <Col md="2">
                    <div className="profileDisplay card">
                        <div className="imageUploadDiv">
                            <img className="profileImage card-img" alt='users profile' src={userInfo.avatar} />
                        </div>
                        <div className='card-title'>
                            <h2 className='userName text-center'>
                                {userInfo.userName}
                            </h2>
                        </div>
                        <div className="text-center card-body">
                            <div className='locationDiv card-text'>
                                <h4 className="cardSubTitle" for="location">Location</h4>
                                <p id='location'>{userInfo.location}</p>
                            </div>
                            <div className='bioDiv card-text'>
                                <h4 className="cardSubTitle" for="location">Bio</h4>
                                <p id='location'>{userInfo.bio}</p>
                            </div>
                            <div className="editButtonDiv">
                                <button className="col-10 editSave" onClick={() => setEditPost(true)}>Edit</button>
                            </div>
                        </div>

                    </div>

                </Col>}

            <Col md="10">
                <Row>
                    <Post />

                </Row>
                <Row>
                    {userInfo && <DisplayPost getPosts={getPosts} posts={userInfo.bikes} />}
                </Row>
            </Col>

        </Container>
    )
}
export default Profile;