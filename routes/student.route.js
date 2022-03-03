module.exports = app =>{
    const student = require("../controllers/student.controller.js");
    var router = require("express").Router();

    router.post("/", student.create);

    router.get("/carrera=:carrera", student.findByCarrera);

    router.get("/semestre=:semestre", student.findBySemestre);

    router.get("/limit=:limit", student.findByLimite);

    router.get("/:id", student.findOne);    

    router.get("/", student.findAll);

    router.put("/:id", student.update);

    router.delete("/:id", student.delete);

    router.delete("/", student.deleteAll);

    app.use('/student', router);
}