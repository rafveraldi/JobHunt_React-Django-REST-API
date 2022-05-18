import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class Register extends Component {
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
    fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Object.keys(data).length > 1) {
          document.getElementById('newcred').innerHTML = `
          <div class="alert alert-success" role="alert">
          Username successfully registered! <strong><a href="/login" class="alert-link">Please login.</a></div>`;
        } else {
          document.getElementById('newcred').innerHTML = `
          <div class="alert alert-danger" role="alert">
          Username already in use. <strong>Try again or <a href="/login" class="alert-link">Login</a>.</div>`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  state = {};
  render() {
    return (
      <Container>
        <br />
        <p id='newcred'></p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <FloatingLabel
              controlId='floatingInput'
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
              controlId='floatingInput'
              label='Password'
              className='mb-3'>
              <Form.Control
                value={this.state.password}
                onChange={this.handleChange}
                type='password'
                autoComplete='password'
                name='password'
              />
            </FloatingLabel>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Register
          </Button>
          <br />
          <br />
          <p>
            Already have a username? <a href='/login'>Login</a>
          </p>
        </Form>
      </Container>
    );
  }
}

export default Register;
