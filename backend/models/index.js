const User = require("./User");
const Session = require("./Session");

Session.belongsTo(User, {
  foreignKey: "usuarios_id",
  onDelete: "CASCADE",
});
User.hasMany(Session, {
  foreignKey: "usuarios_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Session,
};
