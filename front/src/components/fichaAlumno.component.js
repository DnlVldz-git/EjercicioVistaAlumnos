import jsPDF from "jspdf";
import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col, Stack, InputGroup, FormControl } from "react-bootstrap";

const ButtonPDF = ({ datos }) => {

  const [filas, setFilas] = useState([]);

  useEffect(() => {
    crearFilasTabla();
  }, []);

  const pdf = () => {
    var doc = new jsPDF({
      unit: "in",
      format: [24, 50],
    });

    doc.setFont("times", "italic", "normal");
    doc.setFontSize(30);

    doc.text(
      `EL C. FERNANDO TOLEDO TOLEDO DIRECTOR DEL INSTITUTO TECNOLÓGICO DE OAXACA CLAVE 20DIT0002N`,
      1.5,
      1.2
    );
    doc.text(
      `CERTIFICA QUE SEGÚN CONSTANCIAS QUE EXISTEN EN EL ARCHIVO ESCOLAR DE ESTE INSTITUTO EL (LA) C.`,
      1.5,
      1.7
    );
    doc.text(
      `${String(datos[0].nombre)} ${String(datos[0].apePat)} ${String(datos[0].apeMat)} CURSO LAS ASIGNATURAS QUE INTEGRAN EL PLAN DE ESTUDIO DE ${String(datos[0].carrera)}`,
      1.5,
      2.2
    );

    doc.setFontSize(50);
    doc.text(`Nombre materia`, 1.5, 4);

    doc.text(`Calificacion`, 10, 4);

    doc.text(`Creditos`, 17, 4);

    doc.setFontSize(30);

    let renglones = 5.5;
    let lastOrden = -1;

    for (let x in datos) {
      if (datos[x].ordenCertificado !== lastOrden) {
        lastOrden = datos[x].ordenCertificado;
        doc.text(datos[x].nomMateria, 1.5, renglones);
        doc.text(String(datos[x].calificacion), 12.7, renglones);
        doc.text(String(datos[x].creditos), 18.8, renglones);
        renglones += .6;
      }
    }

    let nombreAlumno = datos[0].nombre + datos[0].apePat + datos[0].apeMat + datos[0].noControl;
    doc.save(nombreAlumno);
  };

  const crearFilasTabla = () => {
    var filasTabla = [];
    let lastOrden = -1;
    let index = 0;
    for (let x in datos) {
      if (datos[x].ordenCertificado !== lastOrden) {
        lastOrden = datos[x].ordenCertificado;
        filasTabla.push(
          <tr key={index}>
            <td>{datos[x].ordenCertificado}</td>
            <td>{datos[x].nomMateria}</td>
            <td>{datos[x].codMateria}</td>
            <td>{datos[x].calificacion}</td>
            <td>{datos[x].creditos}</td>
          </tr>
        );
        index++;
      }
    }
    setFilas(filasTabla);
  }

  return (
    <div style={{ margin: "20px", fontFamily: "Roboto" }}>
      <Stack gap={2}>
        <Container>
          <Row>
            <Col md={10}><h1>{datos[0].nombre + " " + datos[0].apePat + " " + datos[0].apeMat}</h1></Col>
            <Col md={2}><Button variant="success w-100" onClick={pdf}>Generar PDF</Button></Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col md={5}><InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Carrera</InputGroup.Text>
              <FormControl
                value={datos[0].carrera} readOnly
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            </Col>
            <Col md={5}><InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">Especialidad</InputGroup.Text>
              <FormControl
                value={datos[0].especialidad} readOnly
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            </Col>
            <Col md={2}><InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Semestre</InputGroup.Text>
              <FormControl
                value={datos[0].semestre} readOnly
                aria-describedby="basic-addon3"
              />
            </InputGroup>
            </Col>
          </Row>
        </Container>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th># Orden</th>
              <th>Materia</th>
              <th>C&oacute;digo de materia</th>
              <th>Calificaci&oacute;n</th>
              <th>Cr&eacute;ditos</th>
            </tr>
          </thead>
          <tbody>
            {filas}
          </tbody>
        </Table>
      </Stack>
    </div>
  );
};

export default ButtonPDF;
