import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "redaxios";

const Login = ({setSession}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    console.log(`username: ${username}, password: ${password}`);

    // test to see if front connects with back
    axios
      .get("https://backend-ingsoftware.onrender.com/api/info")
      .then((res) => {
        console.log(res.data);
        setSession(res.data);
      });
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
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
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
            id="password"
          />
          <div
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button type="submit" onClick={login}>
          Ingresar
        </button>
        <a href="#" className="forgot-password">
          ¿Olvidó su contraseña?
        </a>
      </form>
    </>
  );
};

export default Login;
