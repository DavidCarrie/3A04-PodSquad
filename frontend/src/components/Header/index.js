import { useContext } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
} from 'react-bootstrap';
import { Search, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

export default function Header() {

  const { logout, isAuthenticated } = useContext(AuthContext);

  return (<>
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/" style={{ marginRight: '2em', fontSize: '1.6em' }}>PodSquad</Navbar.Brand>
      {isAuthenticated ? <>
        <Form inline style={{ width: '100%' }}>
          <FormControl type="text" placeholder="Search"
            style={{ width: '20em', height: '1.9em' }} className="mr-lg-2" />
            <a href="/search" className="btn btn-primary"><Search /></a>
        </Form>
        <Nav className="justify-content-end" style={{ width: '100%' }}>
          <Nav.Link as={Link} to="/recommendations">Recommendations</Nav.Link>
          <Nav.Link as={Link} to="/rankings">Rankings</Nav.Link>
          <Nav.Link as={Link} to="/profile">
            <PersonCircle style={{ marginRight: '0.5em' }} size={30} />
            Profile
          </Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </> : <></>}
    </Navbar>
  </>);
}