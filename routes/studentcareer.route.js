module.exports = app =>{
    const studentCareer = require("../controllers/studentCareer.controller.js");
    var router = require("express").Router();

    router.post("/", studentCareer.create);

    router.get("/:noControl", studentCareer.findBynoControl);

    router.delete("/", studentCareer.deleteAll);

    app.use('/studentCareer', router);
}