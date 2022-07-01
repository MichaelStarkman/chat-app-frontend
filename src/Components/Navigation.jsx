import React from 'react'
import { useLogoutUserMutation } from "../services/appApi";
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from "react-redux";
import logo from '../assets/logo.png'
 
const Navigation = () => {
    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }
    return (    
        <Navbar bg="light" expand="lg">
        <Container>
            <LinkContainer style={{ display: "flex"}} to="/">
                <Navbar.Brand >
                    <img src={logo} style={{ width: 50, height: 50}}/>
                    <p>StarkChat</p>
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                {!user && (
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>               
                    </LinkContainer>
                )}
                {/* <LinkContainer to="/chat">
                    <Nav.Link>Chat</Nav.Link>               
                </LinkContainer>          */}
                {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                        {user.name}
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item> 
                                    <LinkContainer to="/">
                                        <Nav.Link>Home</Nav.Link>               
                                    </LinkContainer> 
                                </NavDropdown.Item>
                                <NavDropdown.Item> 
                                    <LinkContainer to="/chat">
                                        <Nav.Link>Chat</Nav.Link>               
                                    </LinkContainer> 
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}

export default Navigation