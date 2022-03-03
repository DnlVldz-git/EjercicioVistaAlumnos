module.exports = {
    HOST: "localhost",
    USER: "administrador",
    PASSWORD: "123",
    DB: "WebDevP1",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};