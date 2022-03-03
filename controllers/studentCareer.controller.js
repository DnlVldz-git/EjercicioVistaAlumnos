const db = require("../models/index.model.js");
const StudentCareer = db.studentCareer;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.nombre && !req.body.apePat && !req.body.apeMat && !req.body.noControl
        && !req.body.codCarrera && !req.body.semestre && !req.body.carrera
        && !req.body.especialidad && !req.body.codMateria && !req.body.nomMateria
        && !req.body.periodo && !req.body.calificacion && !req.body.tipoCalificacion
        && !req.body.descEvaluacion && !req.body.ordenCertificado && !req.body.idStudent&& !req.body.creditos) {
        res.status(400).send({
            message: "El contenido no puede ser vacio"
        });
        return;
    }

    const stu = {        
        nombre: req.body.nombre,
        apePat: req.body.apePat,
        apeMat: req.body.apeMat,
        noControl: req.body.noControl,
        codCarrera: req.body.codCarrera,        
        semestre: req.body.semestre,
        carrera: req.body.carrera,
        especialidad: req.body.especialidad,
        codMateria: req.body.codMateria,
        nomMateria: req.body.nomMateria,
        periodo: req.body.periodo,
        calificacion: req.body.calificacion,
        tipoCalificacion: req.body.tipoCalificacion,
        descEvaluacion: req.body.descEvaluacion,
        creditos: req.body.creditos,
        ordenCertificado: req.body.ordenCertificado,
        idStudent: req.body.idStudent
    };

    StudentCareer.create(stu)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "error al crear el Estudiante"
            });
        });
};

exports.findBynoControl= (req, res) => {
    const noControl = req.params.noControl;
    var condition = noControl ? { noControl: { [Op.eq]: `${noControl}` } } : null;

    StudentCareer.findAll({attributes:['ordenCertificado','nombre','apePat','apeMat','semestre','carrera','especialidad','codMateria','nomMateria','periodo','calificacion','creditos','ordenCertificado','idStudent','noControl'], 
                            where: condition, 
                            group: ['ordenCertificado','nombre','apePat','apeMat','semestre','carrera','especialidad','codMateria','nomMateria','periodo','calificacion','creditos','ordenCertificado','idStudent','noControl'],
                            order:['ordenCertificado']} )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar estudiante por noControl."
            });
        });
};

exports.deleteAll = (req, res) => {
    StudentCareer.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Estudinates detalle fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Error"
            });
        });
};