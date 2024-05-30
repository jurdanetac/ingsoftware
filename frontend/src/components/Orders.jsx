import * as React from "react";
import Link from "@mui/material/Link";
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

export default function Orders() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    apiService.getTransactions().then(async (res) => {
      const usuarios = await apiService.getUsers();
      const clientes = await apiService.getClients();
      const proveedores = await apiService.getSuppliers();

      const newRows = res.map((row) => {
        const newRow = { ...row };
        newRow.marca_de_tiempo = new Date(row.marca_de_tiempo).toLocaleString();
        newRow.usuarios_id = usuarios.find(
          (usuario) => usuario.id === row.usuarios_id,
        ).nombre;

        if (row.clientes_id) {
          newRow.clientes_id = clientes.find(
            (cliente) => cliente.id === row.clientes_id,
          ).nombre;
          newRow.proveedores_id = "N/A";
        } else {
          newRow.proveedores_id = proveedores.find(
            (proveedor) => proveedor.id === row.proveedores_id,
          ).nombre;
          newRow.clientes_id = "N/A";
        }

        return newRow;
      });

      setRows(newRows);
    });
  }, []);

  return (
    <React.Fragment>
      <Title>Transacciones Recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Marca de tiempo</TableCell>
            <TableCell>Tasa BCV</TableCell>
            <TableCell>Beneficiario</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell align="right">Importe en bolívares</TableCell>
            <TableCell align="right">Importe en dólares</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.marca_de_tiempo}</TableCell>
              <TableCell>{`Bs.D. ${row.tasa_bcv}`}</TableCell>
              <TableCell>{row.clientes_id}</TableCell>
              <TableCell>{row.proveedores_id}</TableCell>
              <TableCell>{row.usuarios_id}</TableCell>
              <TableCell align="right">{`Bs.D. ${row.tasa_bcv * row.importe_en_dolares}`}</TableCell>
              <TableCell align="right">{`$${row.importe_en_dolares}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
