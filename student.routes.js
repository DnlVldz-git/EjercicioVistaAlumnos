module.exports = app =>{
    const DataExcel = require("./student.controller.js");
    var router = require("express").Router();

    //Crear una fila en el Excel
    router.post("/students", DataExcel.create);

    //Obtener todos las filas del Excel
    router.get("/students", DataExcel.findAll);

    //Encontrar una fila por Id
    router.get("/students/getById/:id", DataExcel.findOne);

    //Encontrar una fila por Carrera
    router.get("/students/getByCareer/:career", DataExcel.findByCareer);

    //Encontrar una fila por Status
    router.get("/students/getByStatus/:status", DataExcel.findByStatus);

    //Actualizar una fila por id
    router.put("/students/:id", DataExcel.update);

    //Eliminar una fila por id
    router.delete("/students/:id", DataExcel.delete);

    //Eliminar todas las filas del Excel
    router.delete("/students", DataExcel.deleteAll);
    
    app.use('/api/v1', router);
}