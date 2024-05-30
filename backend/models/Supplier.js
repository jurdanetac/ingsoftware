const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Supplier extends Model {}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rif: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "proveedores",
  },
);

module.exports = Supplier;
