const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("usuarios", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cedula: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      rol: {
        type: DataTypes.ENUM("administrador", "empleado"),
        allowNull: false,
      },
      hash_de_contrasena: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      pregunta_seguridad: {
        type: DataTypes.ENUM(
          "¿Cuándo es tu cumpleaños?",
          "¿A qué secundaria fuiste?",
          "¿Cómo se llamaba tu mamá?",
          "¿Cuál es tu postre favorito?",
        ),
        allowNull: false,
      },
      respuesta_seguridad: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    });

    await queryInterface.createTable("sesiones", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      valido_hasta: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      usuarios_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sesiones");
    await queryInterface.dropTable("usuarios");
  },
};
