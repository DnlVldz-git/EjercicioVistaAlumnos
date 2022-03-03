const db = require("./index.js");
const ExcelJS = require('exceljs');
const path = require('path');
const moment = require('moment');

const Student = db.student;
const Op = db.Sequelize.Op;
const filePath = path.resolve(__dirname, 'Datos.xlsx');
const libroExcel = new ExcelJS.Workbook();

exports.obtenerDatosExcel = () => {
    libroExcel.xlsx.readFile(filePath).then(function () {
        var hoja = libroExcel.getWorksheet(1);

        for (let i = 4; i <= hoja.actualRowCount; i++) {
            let alumno = {
                noControl: hoja.getRow(i).getCell('C').value.toString(),
                nombre: hoja.getRow(i).getCell('D').value,
                paterno: hoja.getRow(i).getCell('E').value,
                materno: hoja.getRow(i).getCell('F').value,
                nacimiento: hoja.getRow(i).getCell('G').value,
                carrera: hoja.getRow(i).getCell('H').value,
                semestre: hoja.getRow(i).getCell('I').value,
                status: hoja.getRow(i).getCell('J').value,
                promedio: hoja.getRow(i).getCell('K').value,
                creacion: hoja.getRow(i).getCell('L').value
            };
            Student.create(alumno)
                .then(data => {

                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }).catch(e => {
        console.log(e);
    });
}

// Crear y guardar una nueva fila
exports.create = (req, res) => {
    if (req.body.noControl != '' && req.body.nombre != '' && req.body.paterno != ''
        && req.body.materno != '' && req.body.carrera != '') {
            
        let nuevo = req.body;
        nuevo.nacimiento =  moment(nuevo.nacimiento, "DD-MM-YYYY").toDate();
        nuevo.creacion = new Date();

        Student.create(nuevo)
            .then(data => {
                res.send({ message: `Estudiante agregado con exito` })
            })
            .catch(err => {
                console.log(err);
                res.send({ message: err.message || "Error al crear al estudiante." });
            });
    }
    else {
        res.send({ message: "Contenido no puede estar vacio" });
    }
};

// Recuperar todos las filas del Excel
exports.findAll = (req, res) => {
    const limite = parseInt(req.query.limit);

    if(limite){
        Student.findAll( { limit: limite } )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los estudiantes."
            });
        });
    }
    else{
        Student.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los estudiantes."
            });
        });
    }
};

// Encontrar fila por id
exports.findOne = (req, res) => {
    const id = parseInt(req.params.id);
    Student.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar estudiante por id=" + id
            });
        });
};

// Encontrar fila por carrera
exports.findByCareer = (req, res) => {
    const career = req.params.career;
    var condition = career ? { carrera: { [Op.eq]: career } } : null;
    Student.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los estudiantes de la carrera."
            });
        });
};

// Encontrar fila por status
exports.findByStatus = (req, res) => {
    const status = req.params.status;
    var condition = status ? { status: { [Op.eq]: status } } : null;
    Student.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los estudiantes por status."
            });
        });
};

// Actualizar fila por id
exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    let actualizado = req.body;

    Student.update(actualizado, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante se actualizo con exito."
                });
            } else {
                res.send({
                    message: `Error al actualizar Estudiante con id=${id}!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error al actualizar Estudiante con id=" + id
            });
        });
};

// Eliminar una fila por id
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);
    Student.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante eliminado con exito!"
                });
            } else {
                res.send({
                    message: `Error al eliminar Estudiante con id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar Estudiante con id=" + id
            });
        });
};

// Eliminar todas las filas del Excel
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Estudiantes fueron eliminados con exito!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al eliminar Estudiantes."
            });
        });
};