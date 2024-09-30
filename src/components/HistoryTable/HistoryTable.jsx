import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import "./HistoryTable.css";

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = [
        { id: 10, orden: "ORD1234", total: 500, direccion: "Izcalli", fecha: "2023-09-29" },
        { id: 11, orden: "ORD5678", total: 700, direccion: "Tlalnepantla", fecha: "2023-09-28" },
        { id: 12, orden: "ORD5679", total: 300, direccion: "Atizapan", fecha: "2023-09-27" },
        { id: 13, orden: "ORD5680", total: 400, direccion: "Toluca", fecha: "2023-09-26" },
      ];
      setData(fetchedData);
    };
    fetchData();
  }, []);

  const handleDetailClick = (id) => {
    setSelectedDetail(id === selectedDetail ? null : id);
  };

  return (
    <div className="Table">
      <h1>Historial de ventas ZAZIL</h1>
      <TableContainer
        className="ScrollbarCustomHistory"
        component={Paper}
        elevation={7}
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          maxHeight: 600,
          overflow: "auto",
          backgroundColor: "#ffecf4",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="product table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">Id_Producto</TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">Orden</TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">Total$</TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">Dirección</TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">Fecha</TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">{row.id}</TableCell>
                  <TableCell align="left">{row.orden}</TableCell>
                  <TableCell align="left">{row.total}</TableCell>
                  <TableCell align="left">{row.direccion}</TableCell>
                  <TableCell align="left">{row.fecha}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      style={{
                        background: "#FF919D",
                        color: "white",
                        borderRadius: "20px",
                      }}
                      onClick={() => handleDetailClick(row.id)}
                    >
                      Ver Detalle
                    </Button>
                  </TableCell>
                </TableRow>
                {selectedDetail === row.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card>
                          <CardContent>
                            <h4>Detalles para: {row.orden}</h4>
                            <p>Id_Producto: {row.id}</p>
                            <p>Orden: {row.orden}</p>
                            <p>Total: ${row.total}</p>
                            <p>Dirección: {row.direccion}</p>
                            <p>Fecha: {row.fecha}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;
