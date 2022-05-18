import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Nav } from 'react-bootstrap';

class JobNavBar extends Component {
  render() {
    function logout() {
      localStorage.clear();
      window.location.reload();
    }
    if (localStorage.getItem('accessToken') == null) {
      return (
        <Container>
          <Navbar variant='dark' bg='dark' sticky='top'>
            <Container>
              <Navbar.Brand href='/'>JobHunt</Navbar.Brand>
              <Nav className='d-flex gap-2'>
                <Nav.Link variant='outline-light' href='/login'>
                  Login
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Container>
      );
    } else {
      return (
        <Container>
          <Navbar variant='dark' bg='dark' sticky='top'>
            <Container>
              <Navbar.Brand href='/'>JobHunt</Navbar.Brand>
              <Nav className='d-flex gap-2'>
                <Nav.Link variant='outline-light' href='/add'>
                  Add jobs
                </Nav.Link>
                <Nav.Link variant='outline-light' onClick={logout}>
                  Logout
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Container>
      );
    }
  }
}

export default JobNavBar;
