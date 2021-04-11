import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Link
} from 'react-bootstrap';
import { Search, PersonCircle } from 'react-bootstrap-icons';

export default function Header() {
  return (<>
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/" style={{ marginRight: '2em', fontSize: '1.6em' }}>PodSquad</Navbar.Brand>
      <Form inline style={{ width: '100%' }}>
        <FormControl type="text" placeholder="Search"
          style={{ width: '20em', height: '1.9em' }} className="mr-lg-2" />
          <a href="/search" className="btn btn-primary"><Search /></a>
      </Form>
      <Nav className="justify-content-end" style={{ width: '100%' }}>
        <Nav.Link href="/recommendations">Recommendations</Nav.Link>
        <Nav.Link href="/rankings">Rankings</Nav.Link>
        <Nav.Link href="/profile">Profile
                    <PersonCircle style={{ marginLeft: '1em' }} size={30} /></Nav.Link>
      </Nav>
    </Navbar>
  </>);
}