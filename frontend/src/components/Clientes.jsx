import * as React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import apiService from "../services/api";

function preventDefault(event) {
  event.preventDefault();
}

export default function Clientes() {
  const [rows, setRows] = React.useState([]);
  const [n, setN] = React.useState(5);

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
      <Button>Añadir</Button>
    </React.Fragment>
  );
}
