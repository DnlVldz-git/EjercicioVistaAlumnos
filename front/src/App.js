import logo from './logo.svg';
import './App.css';
import ButtonPDF from './components/fichaAlumno.component';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Historial acad&eacute;mico</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="justify-content-end">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Buscar"
              />
              <Button variant="warning">Buscar</Button>
            </Form>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <ButtonPDF id={2}></ButtonPDF>
      </Container>
    </div>
  );
}

export default App;
