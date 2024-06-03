import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
import { mainListItems } from "./listItems";

import AppBar from "./AppBar";
import Drawer from "./Drawer";
import InputField from "./InputField";

import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import apiService from "../services/api";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: { mode: "dark" },
});

export default function Client({ session, logout }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = React.useState({});
  const [nombre, setNombre] = React.useState("");
  const [cedula, setCedula] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [direccion, setDireccion] = React.useState("");

  // get client we are going to show
  React.useEffect(() => {
    apiService.getClients(id).then((clients) => {
      const client = clients.find((c) => c.id === Number(id));
      // if client is not found, redirect to home
      if (!client) {
        <Navigate replace to="/" />;
        return;
      }

      console.log(client)

      setCliente(client);
      setNombre(client.nombre);
      setCedula(client.cedula);
      setTelefono(client.telefono);
      setDireccion(client.direccion);
    });
  }, []);

  const handleUpdate = () => {
    apiService
      .updateClient(id, {
        nombre,
        cedula,
        telefono,
        direccion,
      })
      .then(() => {
        window.alert("Cliente modificado");
        navigate(`/clientes`);
      });
  };

  // sidebar
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Cliente {cliente.nombre}
            </Typography>
            <IconButton color="inherit">
              <Badge color="secondary">
                <LogoutIcon onClick={logout} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/*secondaryListItems*/}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <InputField
            id="cliente"
            label="Cliente"
            value={nombre}
            onChange={setNombre}
          />
          <InputField
            id="cedula"
            label="Cédula"
            value={cedula}
            onChange={setCedula}
          />
          <InputField
            id="telefono"
            label="Teléfono"
            value={telefono}
            onChange={setTelefono}
          />
          <InputField
            id="direccion"
            label="Dirección"
            value={direccion}
            onChange={setDireccion}
          />
          <Button variant="contained" color="success" onClick={handleUpdate}>
            Modificar
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
