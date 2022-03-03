const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const { obtenerDatosExcel } = require('./student.controller.js');

const PORT = 9595;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server esta ejecutandose en puerto ${PORT}.`);
});

const db = require("./index.js");

db.sequelize.sync({ force: false }).then(() => {
    // obtenerDatosExcel();
    console.log("Eliminar y sincronizar db");
})



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

require("./student.routes.js")(app);