import { 
    Navbar, 
    Nav, 
    NavDropdown,
    Form, 
    FormControl, 
    Button
} from 'react-bootstrap';
import { Search, PersonCircle } from 'react-bootstrap-icons';

export default function Header() {
    return (<>
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/" as='h1' style={{marginRight:'2em'}}>PodSquad</Navbar.Brand>
            <Form inline style={{width:'100%'}}>
                <FormControl type="text" placeholder="Search" 
                    style={{width:'20em', height: '2em'}} className="mr-lg-2" />
                <Button variant="primary"><Search /></Button>
            </Form>
            <Nav className="justify-content-end" style={{width: '100%'}}>
                <Nav.Link href="#home">Recommendations</Nav.Link>
                <Nav.Link href="#features">Rankings</Nav.Link>
                <Nav.Link href="#pricing">Profile 
                    <PersonCircle style={{ marginLeft: '1em' }} size={30}/></Nav.Link>
            </Nav>
        </Navbar>
    </>);
}