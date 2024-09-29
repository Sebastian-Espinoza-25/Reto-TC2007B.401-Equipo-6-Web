import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(id_Producto, Orden, Total, Direccion, Estatus) {
  return { id_Producto, Orden, Total, Direccion, Estatus };
}

const rows = [
  createData(10, 159, 222, "Izcalli", "Envíado"),
  createData(11, 237, 262, "Tlalnepantla", "Pendiente"),
  createData(12, 262, 305, "Atizapan", "Recibido"),
  createData(13, 305, 356, "Toluca", "Recibido"),
  createData(14, 356, 356, "Izcalli", "Envíado"),

];

const makeStyle = (status) => {
  if (status === 'Envíado') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    };
  } else if (status === 'Pendiente') {
    return {
      background: '#ffadad8f',
      color: 'red',
    };
  } else {
    return {
      background: '#59bfff',
      color: 'white',
    };
  }
};

export default function BasicTable() {
  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id_Producto</TableCell>
              <TableCell align="left">Orden</TableCell>
              <TableCell align="left">Total$</TableCell>
              <TableCell align="left">Dirección</TableCell>
              <TableCell align="left">Estatus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows.map((row) => (
              <TableRow
                key={row.id_Producto} 
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id_Producto} {}
                </TableCell>
                <TableCell align="left">{row.Orden}</TableCell>
                <TableCell align="left">{row.Total}</TableCell>
                <TableCell align="left">{row.Direccion}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.Estatus)}>{row.Estatus}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
