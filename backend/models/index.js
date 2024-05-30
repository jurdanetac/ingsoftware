const User = require("./User");
const Session = require("./Session");
const Client = require("./Client");
const Supplier = require("./Supplier");
const Product = require("./Product");
const Transaction = require("./Transaction");
const TransactionProduct = require("./TransactionProduct");

Session.belongsTo(User, {
  foreignKey: "usuarios_id",
  onDelete: "CASCADE",
});
User.hasMany(Session, {
  foreignKey: "usuarios_id",
  onDelete: "CASCADE",
});

Transaction.belongsTo(User, {
  foreignKey: "usuarios_id",
});
User.hasMany(Transaction, {
  foreignKey: "usuarios_id",
});

Transaction.belongsTo(Client, {
  foreignKey: "clientes_id",
  allowNull: true,
});
Client.hasMany(Transaction, {
  foreignKey: "clientes_id",
  allowNull: true,
});

Transaction.belongsTo(Supplier, {
  foreignKey: "proveedores_id",
  allowNull: true,
});
Supplier.hasMany(Transaction, {
  foreignKey: "proveedores_id",
  allowNull: true,
});

Transaction.belongsToMany(Product, {
  through: TransactionProduct,
  foreignKey: "transacciones_id",
});
Product.belongsToMany(Transaction, {
  through: TransactionProduct,
  foreignKey: "productos_id",
});

module.exports = {
  User,
  Session,
  Client,
  Supplier,
  Product,
  Transaction,
  TransactionProduct,
};
