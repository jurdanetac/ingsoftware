// https://github.com/mui/material-ui/blob/v5.15.18/docs/data/material/getting-started/templates/sign-in/SignIn.js

import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Alert from "@mui/material/Alert";

import Copyright from "./Copyright";

import apiService from "../services/api.js";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignIn({ setSession }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  // clear notification after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setNotification("");
    }, 5000);
  }, [notification]);

  const setCedula = (cedula) => {
    // only allow 9 characters
    if (cedula.length > 9) return;

    // only allow numbers
    if (/^[0-9]+$/.test(cedula) || cedula === "") {
      setUsername(cedula);
    }
  };

  const handleSubmit = (event) => {
    // prevent default form submission, page reload
    event.preventDefault();

    if (username === "" || password === "") {
      setNotification("Por favor, llene todos los campos");
      return;
    }

    console.log("logging in with:", {
      username,
      password,
    });

    apiService
      .login(username, password)
      .then((response) => {
        console.log("login response:", response);
        setSession(response);
        window.localStorage.setItem("session", JSON.stringify(response));
        console.log("session stored in local storage");
      })
      .catch((error) => {
        console.error("login error:", error);
        setNotification("Cédula o contraseña incorrecta");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {notification ? <Alert severity="error">{notification}</Alert> : null}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicio de Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Cédula"
              value={username}
              onChange={(event) => setCedula(event.target.value)}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container direction="column" alignItems="center">
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidó su contraseña?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
