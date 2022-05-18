import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

class JobAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_title: '',
      company: '',
      url: '',
      date_applied: '',
      stage: '',
      notes: '',
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
    console.log(this.state);
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
    window.location.replace('/');
  }
  render() {
    return (
      <Container>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Job Title:</Form.Label>
            <Form.Control
              value={this.state.job_title}
              onChange={this.handleChange}
              name='job_title'
              type='text'
              placeholder='Enter job title'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Company:</Form.Label>
            <Form.Control
              value={this.state.company}
              onChange={this.handleChange}
              name='company'
              type='text'
              placeholder='Enter company'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>URL:</Form.Label>
            <Form.Control
              value={this.state.url}
              onChange={this.handleChange}
              name='url'
              type='text'
              placeholder='Enter URL'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Date Applied:</Form.Label>
            <Form.Control
              value={this.state.date_applied}
              onChange={this.handleChange}
              name='date_applied'
              type='date'
              placeholder='Enter date applied'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Stage:</Form.Label>
            <Form.Select
              value={this.state.stage}
              onChange={this.handleChange}
              name='stage'>
              <option value=''> -- Select a stage -- </option>
              <option value='JOBAPPLIED'>Job Applied</option>
              <option value='HRCALL'>HR call</option>
              <option value='FSTINT'>First Interview</option>
              <option value='SNDINT'>Second Interview</option>
              <option value='TRDINT'>Third Interview</option>
              <option value='JOBOFFER'>Job Offer</option>
              <option value='DENIED'>Denied</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Notes:</Form.Label>
            <Form.Control
              value={this.state.notes}
              onChange={this.handleChange}
              name='notes'
              as='textarea'
              rows={3}
              type='text'
              placeholder='Add notes'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Add
          </Button>{' '}
          <Button
            variant='secondary'
            type='button'
            href='javascript:history.go(-1)'>
            Back
          </Button>
        </Form>
      </Container>
    );
  }
}

export default JobAdd;
