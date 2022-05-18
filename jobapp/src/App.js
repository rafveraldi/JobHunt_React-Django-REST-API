import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import Container from 'react-bootstrap/esm/Container';
import JobNavBar from './components/JobNavBar';
import JobTable from './components/JobTable';
import Register from './components/Register';
import JobAdd from './components/JobAdd';
import JobDetail from './components/JobDetail';
import JobEdit from './components/JobUpdate';

function App() {
  return (
    <Container>
      <br />
      <JobNavBar />
      <Router>
        <Routes>
          <Route element={<JobTable />} path='/' exact />
          <Route element={<LoginPage />} path='/login' />
          <Route element={<Register />} path='/register' />
          <Route element={<JobAdd />} path='/add' />
          <Route element={<JobEdit />} path='/edit/:id' />
          <Route element={<JobDetail />} path='/detail/:id' />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

{
}
