const User = require("./User");
const Session = require("./Session");

User.hasMany(Session, {
  foreignKey: "usuarios_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Session,
};
