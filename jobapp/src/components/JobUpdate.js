import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

class JobEdit extends Component {
  state = {};
  componentDidMount() {
    fetch(
      `http://127.0.0.1:8000/api/${window.location.pathname.split('/').pop()}/`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState(data);
        // delete this.state.last_updated;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    fetch(
      `http://127.0.0.1:8000/api/${window.location.pathname.split('/').pop()}/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(this.state),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    window.location.replace('/');
  }
  handleDelete(event) {
    if (window.confirm('This action will delete this job.')) {
      event.preventDefault();
      fetch(
        `http://127.0.0.1:8000/api/${window.location.pathname
          .split('/')
          .pop()}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
          body: JSON.stringify(this.state),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      window.location.replace('/');
    }
  }
  render() {
    return (
      <Container>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Job Title:</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              defaultValue={this.state.job_title}
              name='job_title'
              type='text'
              placeholder='Enter job title'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Company:</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              defaultValue={this.state.company}
              name='company'
              type='text'
              placeholder='Enter company'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>URL:</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              defaultValue={this.state.url}
              name='url'
              type='text'
              placeholder='Enter URL'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Date Applied:</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              defaultValue={this.state.date_applied}
              name='date_applied'
              type='date'
              placeholder='Enter date applied'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Stage:</Form.Label>
            <Form.Select
              onChange={this.handleChange}
              value={this.state.stage}
              name='stage'>
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
              onChange={this.handleChange}
              defaultValue={this.state.notes}
              name='notes'
              as='textarea'
              rows={3}
              type='text'
              placeholder='Add notes'
            />
          </Form.Group>
          <fieldset disabled>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Last Updated:</Form.Label>
              <Form.Control
                defaultValue={this.state.last_updated}
                type='text'
                placeholder='Last updated info.'
              />
            </Form.Group>
          </fieldset>
          <>
            <Button variant='primary' type='submit'>
              Save
            </Button>{' '}
            <Button
              variant='secondary'
              type='button'
              href='javascript:history.go(-1)'>
              Back
            </Button>{' '}
            <Button variant='danger' onClick={this.handleDelete}>
              Delete
            </Button>
          </>
        </Form>
      </Container>
    );
  }
}

export default JobEdit;
