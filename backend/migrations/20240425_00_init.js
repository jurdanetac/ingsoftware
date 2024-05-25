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
      hashDeContrasena: {
        type: DataTypes.STRING(60),
        allowNull: false,
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
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    });

    /*
    await queryInterface.addColumn('notes', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    */
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("usuarios");
    // await queryInterface.dropTable('sesiones')
  },
};
