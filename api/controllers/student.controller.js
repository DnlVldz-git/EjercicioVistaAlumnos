const db = require("../models/index.model.js");
const Student = db.student;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log(req.body);
  if (
    !req.body.noControl &&
    !req.body.nombre &&
    !req.body.apePat &&
    !req.body.apeMat &&
    !req.body.fechaNac &&
    !req.body.carrera &&
    !req.body.semestre &&
    !req.body.estatusAlumno
  ) {
    res.status(400).send({
      message: "El contenido no puede ser vacio",
    });
    return;
  }

  const stu = {
    noControl: req.body.noControl,
    nombre: req.body.nombre,
    apePat: req.body.apePat,
    apeMat: req.body.apeMat,
    fechaNac: req.body.fechaNac,
    carrera: req.body.carrera,
    semestre: req.body.semestre,
    estatusAlumno: req.body.estatusAlumno,
    promedioCertificado: req.body.promedioCertificado,
    fechaCreacion: req.body.fechaCreacion,
  };

  Student.create(stu)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "error al crear el Estudiante",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al recuperar Estudiante por id=" + id,
      });
    });
};

exports.findByCarrera = (req, res) => {
  const carrera = req.params.carrera;
  var condition = carrera ? { carrera: { [Op.eq]: `${carrera}` } } : null;

  Student.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al recuperar usuarios por correo.",
      });
    });
};

exports.findByLimite = (req, res) => {
  const limit = req.params.limit;
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  //var condition = carrera ? { carrera: { [Op.eq]: `${carrera}` } } : null;

  Student.findAll({ where: condition, limit: limit })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al recuperar usuarios por correo.",
      });
    });
};

exports.findBySemestre = (req, res) => {
  const semestre = req.params.semestre;
  var condition = semestre ? { semestre: { [Op.eq]: `${semestre}` } } : null;

  Student.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al recuperar usuarios por correo.",
      });
    });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Student.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al recuperar todos los Estudiantes.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Student.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Estudiante se actualizo con exito.",
        });
      } else {
        res.send({
          message: `No se encontro al Estudiante con id = ${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al actualizar Estudiante con id = " + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Student.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Estudiante eliminado con exito!",
        });
        //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
      } else {
        res.send({
          message: `No se encontro el Estudiante con id = ${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al eliminar Estudiante con id = " + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Student.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Estudinates fueron eliminados con exito!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || " Error",
      });
    });
};
