import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "./Card";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    console.log(`username: ${username}, password: ${password}`);
  };

  const formStyle = {
    width: "90%",
    maxWidth: "400px",
    backgroundColor: "rgba(255, 255, 255, 0.13)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
    padding: "50px 35px",
  };

  const form = (
    <form style={formStyle} onSubmit={(event) => event.preventDefault()}>
      <h3>Bienvenido</h3>

      <label htmlFor="username">Cédula</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Cédula"
        id="username"
      />

      <label htmlFor="password">Contraseña</label>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Contraseña"
          id="password"
        />
        <div onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>

      <button type="submit" onClick={login}>
        Ingresar
      </button>
      <Link to="/forgot-password">¿Olvidó su contraseña?</Link>
    </form>
  );

  return <Card form={form} />;
};

export default ForgotPassword;
