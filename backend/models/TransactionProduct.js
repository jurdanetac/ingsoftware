const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class TransactionProduct extends Model {}

TransactionProduct.init(
  {
    cantidad: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "transacciones_tiene_productos",
  },
);

module.exports = TransactionProduct;
