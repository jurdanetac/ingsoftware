import * as React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import InputField from "./InputField";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import apiService from "../services/api";

export default function Clientes() {
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
  const sortRows = (rows) => rows.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Add client logic
  const handleAdd = () => {
    apiService.addClient({ nombre, cedula, telefono, direccion }).then((res) => {
      // TODO validations and error handling
      // TODO V-G-J
      setRows(sortRows([...rows, res]));
      clearForm();
      window.alert("Cliente añadido correctamente");
    }).catch((err) => {
      console.error(err);
      window.alert(`Error al añadir cliente : ${err}`);
      clearForm();
    });
  };

  // Fetch clients on component mount
  React.useEffect(() => {
    apiService.getClients().then((data) => {
      setRows(sortRows(data));
    });
  }, []);

  return (
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
                <DeleteIcon />
                <CreateIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color="primary" onClick={() => setN(n + 5)} sx={{ mt: 3 }}>
        Ver más clientes
      </Button>
      {setShowForm && (
        <Button color="primary" variant="contained" onClick={() => setShowForm(!showForm)} sx={{ mt: 3 }}>
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
          <Button onClick={handleAdd} variant="contained" color="success" sx={{ mt: 3 }}>Añadir</Button>
        </>
      )}
    </React.Fragment>
  );
}
