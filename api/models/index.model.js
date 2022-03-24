const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: 5432,
    dialect: dbConfig.dialect,
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    //     }
    // },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.studentCareer = require("./studentcareer.model.js")(sequelize,Sequelize);

module.exports = db;