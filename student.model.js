module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        noControl: {
            type: Sequelize.STRING
        },
        nombre: {
            type: Sequelize.STRING
        }, 
        paterno: {
            type: Sequelize.STRING
        },
        materno: {
            type: Sequelize.STRING
        },
        nacimiento: {
            type: Sequelize.DATEONLY
        },
        carrera: {
            type: Sequelize.STRING
        },
        semestre: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING
        },
        promedio: {
            type: Sequelize.DECIMAL
        },
        creacion: {
            type: Sequelize.DATEONLY
        }
    });
    return Student;
};