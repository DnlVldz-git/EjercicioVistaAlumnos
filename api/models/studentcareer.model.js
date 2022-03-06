module.exports = (sequelize, Sequelize) => {
    const StudentCareer = sequelize.define("studentcareer", {        
        nombre: {
            type: Sequelize.STRING
        },
        apePat : {
            type : Sequelize.STRING
        },
        apeMat :{
            type: Sequelize.STRING
        },
        noControl:{
            type : Sequelize.INTEGER
        },
        codCarrera :{
            type: Sequelize.STRING
        },        
        semestre :{
            type: Sequelize.INTEGER
        },
        carrera: {
            type: Sequelize.STRING
        },
        especialidad:{
            type: Sequelize.STRING
        },
        codMateria:{
            type: Sequelize.STRING
        },
        nomMateria:{
            type: Sequelize.STRING
        },
        periodo:{
            type: Sequelize.INTEGER
        },
        calificacion:{
            type: Sequelize.INTEGER
        },
        tipoCalificacion:{
            type: Sequelize.STRING
        },
        descEvaluacion:{
            type: Sequelize.STRING
        },
        creditos:{
            type: Sequelize.INTEGER
        },
        ordenCertificado:{
            type: Sequelize.INTEGER
        },
        idStudent:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });

    return StudentCareer;
}