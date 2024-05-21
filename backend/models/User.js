const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cedula: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("administrador", "empleado"),
      allowNull: false,
    },
    hashDeContrasena: {
      type: DataTypes.TEXT,
      length: 60,
    },
    preguntaSeguridad: {
      type: DataTypes.ENUM(
        "¿Cuándo es tu cumpleaños?",
        "¿A qué secundaria fuiste?",
        "¿Cómo se llamaba tu mamá?",
        "¿Cuál es tu postre favorito?",
      ),
      allowNull: false,
    },
    respuestaSeguridad: {
      type: DataTypes.TEXT,
      length: 60,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "usuario",
  },
);

module.exports = User;
