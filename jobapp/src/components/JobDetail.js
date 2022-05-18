import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

class JobDetail extends Component {
  state = {};
  componentDidMount() {
    fetch(
      `http://127.0.0.1:8000/api/${window.location.pathname.split('/').pop()}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <Container>
        <br />
        <Form>
          <fieldset disabled>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Job Title:</Form.Label>
              <Form.Control
                defaultValue={this.state.job_title}
                name='job_title'
                type='text'
                placeholder='Enter job title'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Company:</Form.Label>
              <Form.Control
                defaultValue={this.state.company}
                name='company'
                type='text'
                placeholder='Enter company'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>URL:</Form.Label>
              <Form.Control
                defaultValue={this.state.url}
                name='url'
                type='text'
                placeholder='Enter URL'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Date Applied:</Form.Label>
              <Form.Control
                defaultValue={this.state.date_applied}
                name='date_applied'
                type='date'
                placeholder='Enter date applied'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Stage:</Form.Label>
              <Form.Select value={this.state.stage} name='stage'>
                <option value=''>Select a stage. </option>
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
                defaultValue={this.state.notes}
                name='notes'
                as='textarea'
                rows={3}
                type='text'
                placeholder='Add notes'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Last Updated:</Form.Label>
              <Form.Control
                defaultValue={this.state.last_updated}
                type='text'
                placeholder='Last updated info.'
              />
            </Form.Group>
          </fieldset>
          <Button
            onClick={() =>
              window.open(
                `/edit/${window.location.pathname.split('/').pop()}`,
                '_self'
              )
            }
            variant='primary'>
            Edit
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

export default JobDetail;
