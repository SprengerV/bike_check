import React, { useState, useEffect, useRef } from "react";
import Post from "../Post"
import API from '../../utils/API';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Axios from 'axios'


import { useAuth0 } from '@auth0/auth0-react';
import { Row, Col, Container } from 'react-bootstrap';
import DisplayPost from "../DisplayPost";
import axios from "axios";




const Profile = (props) => {

    const { getUsers } = API;
    const { user } = useAuth0();
    const [userInfo, setUserInfo] = useState([])
    const [editPost, setEditPost] = useState(false)
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')
    const userNameRef = useRef();

    const [ imageSelected, setImageSelected ] = useState("")
    const [ previewSource, setPreviewSource ] = useState("");

    const handleChangeEvent = (e) => {
        const file = e.target.files[0];
        setImageSelected(file)

        previewFile(file)
        console.log(imageSelected)
    }


    // console.log(imageSelected);
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const updateUser = () => {
        axios.put(`api/user/${props.match.params.id}`,
        {
            
        }
        )
    }

    const getPosts = () => {
        getUsers(props.match.params.id).then((data) => setUserInfo(data.data))
    }
    useEffect(() => {
        if (userInfo.length === 0) {
            getPosts()
        }
    })

    console.log(userInfo);


    //    console.log(userInfo);

    return (
        <Container fluid={true} className="row ">
            {editPost ?
                <Col md="2">
                    <div className="profileDisplay card">
                        <div className="imageUploadDiv">
                        <img className="profileImage card-img" src={userInfo.avatar} />
                        
                        </div>
                        <div className=' row card-title'>
                            <input className='userNameInput text-center' ref={userNameRef} defaultValue={userInfo.userName} />
                        </div>
                        <div className="text-center card-body">
                            <div className='row locationDiv card-text'>
                                <label className="col-12" for="location">Location </label>
                                <input type='location' className="locationInput" id='location' placeholder="city, state" />
                             
                            </div>
                            <div className='row bioDiv card-text'>
                                <label className="col-12"for="bio">Bio</label>
                                <textarea maxlength="250" onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself!" className="bioInput" id='bio'/>
                                <p className="text-left" >{bio.length}/250</p>
                            </div>
                            <button className="editSave" onClick={() => setEditPost(false)}>Save</button>

                        </div>

                    </div>

                </Col>
                :
                <Col md="2">
                    <div className="profileDisplay card">
                        <img className="profileImage card-img" src={userInfo.avatar} />
                        <div className='card-title'>
                            <h2 className='userName text-center'>
                                {userInfo.userName}
                            </h2>
                        </div>
                        <div className="text-center card-body">
                            <div className='locationDiv card-text'>
                                <label for="location">Location</label>
                                <p id='location'>{userInfo.location}</p>
                            </div>
                            <div className='bioDiv card-text'>
                                <label for="location">Bio</label>
                                <p id='location'>{userInfo.bio}</p>
                            </div>
                            <button className="editSave" onClick={() => setEditPost(true)}>Edit</button>
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