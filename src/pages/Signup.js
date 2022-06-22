import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import picImg from "../assets/profile-pic.png"

import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // image upload states 
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if(file.size > 1048576) {
      return alert("Max file is 1mb");
    } else {
      setImage (file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "chatApp");
    try {
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/chat-app-cloud/image/upload", {
          method: "post",
          body: data,
      })
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }
  async function handleSignup(e) {
    e.preventDefault();
    if(!image) return alert('Please upload profile picture');
    const url = await uploadImage(image);
    console.log(url)
    // TODO sign up the user
  }

  return (
    <Container>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className="text-center">Create an account</h1>
            <div className="signup-profile-pic__container">
              <img src={ imagePreview || picImg} className="signup-profile-pic" />
              <label htmlFor="image-upload" className="image-upload-label">
              <i className="fa-solid fa-circle-plus add-picture-icon">+</i>
              </label>
              <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your name" onChange={(e)=> setName(e.target.value)} value={name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              {uploadingImg ? 'Signing you up!' : 'Signup'}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup_bg">
        
        </Col>
      </Row>
    </Container>    
  )
}

export default Signup