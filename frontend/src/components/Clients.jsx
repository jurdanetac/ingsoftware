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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import { Link } from "react-router-dom";

import { mainListItems } from "./listItems";
import Copyright from "./Copyright";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import InputField from "./InputField";
import Title from "./Title";

import apiService from "../services/api";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: { mode: "dark" },
});

export default function Clients({ session, logout }) {
  // drawer
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Table states
  const [rows, setRows] = React.useState([]);
  const [n, setN] = React.useState(5);

  // Form states
  const [showForm, setShowForm] = React.useState(false);
  const [nombre, setNombre] = React.useState("");
  const [cedula, setCedula] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [direccion, setDireccion] = React.useState("");

  // Clear form fields
  const clearForm = () => {
    setNombre("");
    setCedula("");
    setTelefono("");
    setDireccion("");
  };

  // Sort rows by name alphabetically ascending
  const sortRows = (rows) =>
    rows.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Add client logic
  const handleAdd = () => {
    if (!nombre || !cedula || !telefono || !direccion) {
      window.alert("Por favor, llene todos los campos");
      return;
    }

    apiService
      .addClient({ nombre, cedula, telefono, direccion })
      .then((res) => {
        // TODO V-G-J
        setRows(sortRows([...rows, res]));
        clearForm();
        setShowForm(false);
        window.alert("Cliente añadido correctamente");
      })
      .catch((err) => {
        console.error(err);
        window.alert(`Error al añadir cliente : ${err}`);
        clearForm();
        setShowForm(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Está seguro que desea eliminar este cliente?")) {
      return;
    }

    apiService.getTransactions().then((res) => {
      if (res.find((r) => r.clientes_id === id)) {
        window.alert(
          "No se puede eliminar un cliente que haya realizado transacciones",
        );
        return;
      }
      apiService.deleteClient(id).then(() => {
        setRows(rows.filter((r) => r.id !== id));
        window.alert("Cliente eliminado correctamente");
      });
    });
  };

  // Fetch clients on component mount
  React.useEffect(() => {
    apiService.getClients().then((data) => {
      setRows(sortRows(data));
    });
  }, []);

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
              Clientes
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Transacciones Recientes */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <React.Fragment>
                  <Title>Clientes</Title>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Cédula</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Dirección</TableCell>
                        <TableCell>Operaciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(0, n).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.nombre}</TableCell>
                          <TableCell>{row.cedula}</TableCell>
                          <TableCell>{row.telefono}</TableCell>
                          <TableCell>{row.direccion}</TableCell>
                          <TableCell>
                            <DeleteIcon
                              onClick={() => handleDelete(row.id)}
                              sx={{ cursor: "pointer" }}
                            />
                            <Link
                              to={`/clientes/${row.id}`}
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              <CreateIcon />
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button
                    color="primary"
                    onClick={() => setN(n + 5)}
                    sx={{ mt: 3 }}
                  >
                    Ver más clientes
                  </Button>
                  {setShowForm && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => setShowForm(!showForm)}
                      sx={{ mt: 3 }}
                    >
                      {showForm ? "Ocultar formulario" : "Nuevo cliente"}
                    </Button>
                  )}
                  {showForm && (
                    <>
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
                    </>
                  )}
                  {showForm && (
                    <Button
                      color="success"
                      variant="contained"
                      onClick={handleAdd}
                      sx={{ mt: 3 }}
                    >
                      Añadir
                    </Button>
                  )}
                </React.Fragment>
              </Paper>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
