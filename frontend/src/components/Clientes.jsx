import * as React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import InputField from "./InputField";

import apiService from "../services/api";

export default function Clientes() {
  const [rows, setRows] = React.useState([]);
  const [n, setN] = React.useState(5);
  const [showForm, setShowForm] = React.useState(false);

  const [nombre, setNombre] = React.useState("");
  const [cedula, setCedula] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [direccion, setDireccion] = React.useState("");

  const handleAdd = () => {
    apiService.addClient({ nombre, cedula, telefono, direccion }).then((res) => {
      // TODO validations and error handling
      // TODO sort rows
      // TODO show success message
      setRows([...rows, res]);
      setNombre("");
      // TODO V-G-J
      setCedula("");
      setTelefono("");
      setDireccion("");
      setShowForm(false);
    });
  };

  React.useEffect(() => {
    apiService.getClients().then((data) => {
      setRows(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(0, n).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.cedula}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.direccion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color="primary" onClick={() => setN(n + 5)} sx={{ mt: 3 }}>
        Ver más clientes
      </Button>
      <Button onClick={() => setShowForm(!showForm)}>Añadir</Button>
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
          <Button onClick={handleAdd}>Agregar</Button>
        </>
      )}
    </React.Fragment>
  );
}
