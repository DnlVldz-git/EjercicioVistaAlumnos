import jsPDF from "jspdf";
import EstudianteService from "../services/estudiante.service";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ButtonPDF = ({ id }) => {
  const [datos, setDatos] = useState();
    
  useEffect(() => {
    EstudianteService.get(parseInt(id)).then((response) => {
      setDatos(response.data);      
    });
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

    for(let x in datos ){
        doc.text(datos[x].nomMateria, 1.5, renglones);
        doc.text(String(datos[x].calificacion), 12.7, renglones);
        doc.text(String(datos[x].creditos), 18.8, renglones);
        renglones += .6;
    }

    doc.save(`doc`);
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Roboto" }}>
      <Button variant="success" onClick={pdf}>Generar PDF</Button>
    </div>
  );
};

export default ButtonPDF;
