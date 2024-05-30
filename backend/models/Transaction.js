const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marca_de_tiempo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    importe_en_dolares: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    tasa_bcv: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "transacciones",
  },
);

module.exports = Transaction;
