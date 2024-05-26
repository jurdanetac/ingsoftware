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

    await queryInterface.bulkInsert("usuarios", [
      {
        id: 1,
        cedula: "29903089",
        nombre: "juan",
        rol: "administrador",
        hash_de_contrasena:
          "$2b$10$mVwVDKUIArIjnW9zpNSj5.NUzkjBGNFTKXEVpM9bGHZ/dbSiVhWa2",
        pregunta_seguridad: "¿Cuál es tu postre favorito?",
        respuesta_seguridad:
          "$2b$10$mVwVDKUIArIjnW9zpNSj5.NUzkjBGNFTKXEVpM9bGHZ/dbSiVhWa2",
      },
      {
        id: 2,
        cedula: "29877987",
        nombre: "samuel",
        rol: "empleado",
        hash_de_contrasena:
          "$2b$10$V1rms6bjuDgK2wMStrN53uOheLkNQXXEd4ZCUP5e2CpAbC8jzLKFi",
        pregunta_seguridad: "¿Cuál es tu postre favorito?",
        respuesta_seguridad:
          "$2b$10$V1rms6bjuDgK2wMStrN53uOheLkNQXXEd4ZCUP5e2CpAbC8jzLKFi",
      },
    ]);

    await queryInterface.bulkInsert("sesiones", [
      {
        id: 1,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Mjk5MDMwODksImlkIjoxLCJpYXQiOjE3MTQ4NDA4MDh9.yF5GZgfu6yjs26eO71L9HWaRbBnnge1tsrkav3nAeC4",
        valido_hasta: "2026-01-01 03:59:59",
        usuarios_id: 1,
      },
      {
        id: 2,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Mjk4Nzc5ODcsImlkIjoyLCJpYXQiOjE3MTQ4NDA5MDd9.6MWQmUdL2QDTU0q6RtjbhUpu5wuOp-QB9dD1qxoId38",
        valido_hasta: "2026-01-01 03:59:59",
        usuarios_id: 2,
      },
    ]);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sesiones");
    await queryInterface.dropTable("usuarios");
  },
};
