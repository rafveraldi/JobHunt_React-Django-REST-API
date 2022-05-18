import { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const stageMap = {
  JOBAPPLIED: 'Job Applied',
  HRCALL: 'HR call',
  FSTINT: 'First Interview',
  SNDINT: 'Second Interview',
  TRDINT: 'Third Interview',
  JOBOFFER: 'Job Offer',
  DENIED: 'Denied',
};

class JobTable extends Component {
  state = { jobs: [] };
  componentDidMount() {
    const headers = { 'Content-Type': 'application/json' };
    if (localStorage.getItem('accessToken') != null)
      headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:8000/api/', {
      method: 'GET',
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ jobs: data });
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  render() {
    return (
      <Container className='jobtable'>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Date Applied</th>
              <th>Stage</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {this.state.jobs.map((job) => (
              <tr
                onClick={() => window.open(`/detail/${job.id}`, '_self')}
                key={job.id}>
                <td>{job.job_title}</td>
                <td>{job.company}</td>
                <td>{job.date_applied}</td>
                <td>{stageMap[job.stage]}</td>
                <td>{job.last_updated}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default JobTable;
