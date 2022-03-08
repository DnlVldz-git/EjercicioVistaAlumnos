import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import EstudianteService from '../services/estudiante.service';
import ButtonPDF from './fichaAlumno.component';
import ReactDOM from "react-dom";
import Swal from 'sweetalert2';

const BarraBusqueda = () => {

    const generarFicha = () => {
        let divDash = document.getElementById('containerFicha');
        let valor = document.getElementById('inputSearch').value;

        if (divDash.children.length > 0) {
            ReactDOM.unmountComponentAtNode(divDash);
        }

        if (valor !== '') {
            EstudianteService.get(parseInt(valor))
                .then(response => {
                    console.log(response.data);
                    if (response.data.length > 0) {
                        ReactDOM.render(<ButtonPDF datos={response.data} />, divDash);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            text: 'No se encontró al alumno.'
                        });
                    }
                });
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'No debes dejar el campo vacío'
            })
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Historial acad&eacute;mico</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className="justify-content-end">
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            id="inputSearch"
                            placeholder="Buscar"
                            className="me-2"
                            aria-label="Buscar"
                        />
                        <Button variant="warning" type="button" onClick={generarFicha}>Buscar</Button>
                    </Form>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default BarraBusqueda;