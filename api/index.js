const express = require("express"); 
require("dotenv").config(); //variables de entorno
const bodyParser = require("body-parser"); //aceptar en peticion el req.body
const app = express();
const PORT = process.env.PORT;

//paquetes para importar datos del excel npm i exceljs
const ExcelJS = require('exceljs');
const path = require('path');
const filePath = path.resolve(__dirname, 'DATOS_ESTUDIANTES.xlsx');
const libroExcel = new ExcelJS.Workbook();
app.get("/", (req, res) => {
    res.send("Hola, Bienvenido");
});

app.use((req, res, next) => { //permisos de cors
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sync = (process.env.MA_DB_SYNC === 'true');

const db = require("./models/index.model.js");

db.sequelize.sync({ alter: sync }).then(() => { //creacion de la bd
    if (sync) {
        console.log("Sincronizar db");
    } else {
        console.log("No se harán cambios a la db");
    }
});

require("./routes/studentcareer.route.js")(app);

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log("Escuchando por el puerto", PORT);
});

//LINEAS PARA IMPORTAR LOS DATOS A BD
const StudentCareer = db.studentCareer;
// obtenerDatosParaBDNewTable();

//funcion para extraer dato de estudiantes fecha 02/03/22
function obtenerDatosParaBDNewTable() {
    libroExcel.xlsx.readFile(filePath).then(function () {
        var hoja = libroExcel.getWorksheet(1);
        
        for (let i = 2; i <= hoja.actualRowCount; i++) {
            let alumno = {
                nombre: hoja.getRow(i).getCell('A').value,
                apePat: hoja.getRow(i).getCell('B').value,
                apeMat: hoja.getRow(i).getCell('C').value,
                noControl: hoja.getRow(i).getCell('D').value,
                codCarrera: hoja.getRow(i).getCell('E').value,
                semestre: hoja.getRow(i).getCell('F').value,
                carrera: hoja.getRow(i).getCell('G').value,
                especialidad: hoja.getRow(i).getCell('H').value,
                codMateria: hoja.getRow(i).getCell('I').value,
                nomMateria: hoja.getRow(i).getCell('J').value,
                periodo: hoja.getRow(i).getCell('K').value,
                calificacion: hoja.getRow(i).getCell('L').value,
                tipoCalificacion: hoja.getRow(i).getCell('M').value,
                descEvaluacion: hoja.getRow(i).getCell('N').value,
                creditos: hoja.getRow(i).getCell('O').value,
                ordenCertificado: hoja.getRow(i).getCell('P').value,
                idStudent: hoja.getRow(i).getCell('Q').value
            };
            StudentCareer.create(alumno)
                .then(data => {
                    // console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }).catch(e => {
        console.log(e);
    });
}