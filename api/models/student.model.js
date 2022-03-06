module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        noControl:{
            type : Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        apePat : {
            type : Sequelize.STRING
        },
        apeMat :{
            type: Sequelize.STRING
        },
        fechaNac :{
            type: Sequelize.DATE
        },
        carrera: {
            type: Sequelize.STRING
        },
        semestre :{
            type: Sequelize.INTEGER
        },
        estatusAlumno:{
            type: Sequelize.STRING
        },
        promedioCertificado:{
            type: Sequelize.DECIMAL
        },
        fechaCreacion:{
            type: Sequelize.DATE
        }
    });

    return Student;
}