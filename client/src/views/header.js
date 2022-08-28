import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header(props) {

  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const {isLoggedin, setIsLoggedin} = props;

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/current-user', {withCredentials: true})
    .then((res)=>{
        console.log(res.data);
        setUser(res.data);
    })
    .catch((err)=>{
        console.log(err)
    })
  },[isLoggedin]);

  const logout = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/logout', {}, {withCredentials: true, })
    .then((res) => {
      setUser(null)
      console.log("successfully logged out")  
      navigate("/")
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Navbar bg="light" expand="lg" fixed='top'>
      <Container>
        <Navbar.Brand href="/">Is It Burnt?</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ?
            <>
            <Navbar.Brand>Hello {user.firstName}</Navbar.Brand>
              <NavDropdown drop='start' title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/recipies">Search Recipies</NavDropdown.Item>
                <NavDropdown.Item href={`/dashboard/${user.userName}`} >My Recipies</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
              </NavDropdown> 
            </>
            :
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <NavDropdown drop='start' title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/recipies">Recipies</NavDropdown.Item>
              </NavDropdown>
            </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;