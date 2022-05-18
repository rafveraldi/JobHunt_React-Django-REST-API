import React, { Component, useContext } from 'react';

import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access == undefined) {
          document.getElementById('badcred').innerHTML = `
          <div class="alert alert-danger" role="alert">
          Invalid credentials. <strong>Try again or <a href="/register" class="alert-link">Register</a>.</div>`;
        } else {
          console.log('Success:', data);
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          window.location.replace('/');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  render() {
    return (
      <Container>
        <br />
        <p id='badcred'></p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <FloatingLabel
              controlId='username'
              label='Username'
              className='mb-3'>
              <Form.Control
                value={this.state.username}
                onChange={this.handleChange}
                type='text'
                autoComplete='username'
                name='username'
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <FloatingLabel
              controlId='password'
              label='Password'
              className='mb-3'>
              <Form.Control
                value={this.state.password}
                onChange={this.handleChange}
                type='password'
                autoComplete='current-password'
                name='password'
              />
            </FloatingLabel>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Login
          </Button>
          <br />
          <br />
          <p>
            Don't you have a username? <a href='/register'>Register</a>
          </p>
        </Form>
      </Container>
    );
  }
}
export default LoginPage;

// function getToken() {
//   fetch('http://127.0.0.1:8000/api/token/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Success:', data),
//         localStorage.setItem('accessToken', data.access),
//         localStorage.setItem('refreshToken', data.refresh);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// };
