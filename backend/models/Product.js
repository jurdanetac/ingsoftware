const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    fechaDeVencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cantidadDisponible: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.BLOB("long"),
    },
    precioEnDolares: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    unidadDeMedicion: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "productos",
  },
);

module.exports = Product;
