const { DataTypes } = require("sequelize"); // { Tipo De Dados } requerimento do Sequelize
const sequelize = require("../config/sequelize");

const Clientes = sequelize.define("clientes", {
    name: DataTypes.STRING,
    cidade: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    cartao: DataTypes.BOOLEAN,
});

module.exports = Clientes;