const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "clientes",
  },
);

module.exports = Client;
