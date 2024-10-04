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
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import "./OrdersTable.css";

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [statusOptions] = useState([
    "Pendiente",
    "Envíado",
    "Entregado",
    "Cancelado",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetched data no longer includes 'estatus'
      const fetchedData = [
        {
          id: 10,
          orden: "ORD1234",
          total: 500,
          direccion: "Izcalli",
          fecha: "2023-09-29",
        },
        {
          id: 11,
          orden: "ORD5678",
          total: 700,
          direccion: "Tlalnepantla",
          fecha: "2023-09-28",
        },
        {
          id: 12,
          orden: "ORD5679",
          total: 300,
          direccion: "Atizapan",
          fecha: "2023-09-27",
        },
        {
          id: 13,
          orden: "ORD5680",
          total: 400,
          direccion: "Toluca",
          fecha: "2023-09-26",
        },
        {
          id: 14,
          orden: "ORD5681",
          total: 350,
          direccion: "Naucalpan",
          fecha: "2023-09-25",
        },
        {
          id: 15,
          orden: "ORD5682",
          total: 250,
          direccion: "Cuautitlan",
          fecha: "2023-09-24",
        },
        {
          id: 16,
          orden: "ORD5683",
          total: 150,
          direccion: "Tultitlan",
          fecha: "2023-09-23",
        },
        {
          id: 17,
          orden: "ORD5684",
          total: 50,
          direccion: "Tepotzotlan",
          fecha: "2023-09-22",
        },
        {
          id: 18,
          orden: "ORD5685",
          total: 100,
          direccion: "Tultepec",
          fecha: "2023-09-21",
        },
        // Add more data if necessary
      ];

      // Initialize estatus as empty or with a default value
      const initializedData = fetchedData.map((item) => ({
        ...item,
        estatus: "Pendiente", // You can set a default status or leave it empty
      }));

      setData(initializedData);
    };
    fetchData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, estatus: newStatus } : item
      )
    );
  };

  const handleDetailClick = (id) => {
    setSelectedDetail(id === selectedDetail ? null : id);
  };

  // Style function for status
  const makeStyle = (status) => {
    if (status === "Entregado") {
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    } else if (status === "Cancelado") {
      return {
        background: "#ffadad8f",
        color: "red",
      };
    } else if (status === "Pendiente") {
      return {
        background: "#e573e7",
        color: "#58005a",
      };
    } else if (status === "Envíado") {
      return {
        background: "#fff888",
        color: "black",
      };
    }
  };

  return (
    <div className="Table">
      <h1>Envíos ZAZIL</h1>
      <TableContainer
        className="ScrollbarCustom"
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
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">
                Id_Producto
              </TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">
                Orden
              </TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">
                Total$
              </TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">
                Dirección
              </TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">
                Fecha
              </TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">
                Estatus
              </TableCell>
              <TableCell style={{ backgroundColor: "#feb4c0" }} align="left">
                Detalle
              </TableCell>
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
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.orden}</TableCell>
                  <TableCell align="left">{row.total}</TableCell>
                  <TableCell align="left">{row.direccion}</TableCell>
                  <TableCell align="left">{row.fecha}</TableCell>
                  <TableCell align="left">
                    <Select
                      value={row.estatus}
                      onChange={(e) =>
                        handleStatusChange(row.id, e.target.value)
                      }
                      variant="outlined"
                      style={{
                        width: "120px",
                        height: "40px",
                        borderRadius: "20px",
                        boxShadow: "0px 13px 20px 0px #80808029",
                        ...makeStyle(row.estatus), // Apply dynamic style based on estatus
                      }}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
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
                    <TableCell colSpan={7}>
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
                            <p>Estatus: {row.estatus}</p>
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
