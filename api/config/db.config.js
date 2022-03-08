
const host = process.env.MA_DB_HOST;
const user = process.env.MA_DB_USER;
const pwd = process.env.MA_DB_PWD;
const db = process.env.MA_DB_NAME;

module.exports = {
    HOST: host,
    USER: user,
    PASSWORD: pwd,
    DB: db,
    dialect: "postgres",
    "dialectOptions": {
        "ssl": true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 3000000, //tiempo máximo, en milisegundos, que el grupo intentará conectarse ant
        idle: 10000 //tiempo máximo, en milisegundos, que una conexión puede estar inactiva ant
    }
};