import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/TableStyles.css";

const PartnerTable = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/partners`);
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  const handleToggleAccountStatus = (email) => {
    // ! Lógica para habilitar/deshabilitar cuenta
    console.log(`Toggle account status for ${email}`);
  };

  const handleDeleteAccount = (email) => {
    // ! Lógica para eliminar cuenta
    console.log(`Delete account for ${email}`);
  };

  return (
    <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
      <Table sx={{ minWidth: 650 }} aria-label="partner table">
        <TableHead>
          <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell>Nombre y Apellido</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Estado de la Cuenta</TableCell>
            <TableCell>Tipo de Cuenta</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.email}>
              <TableCell>
                <img src={partner.profile_pic} alt={`${partner.first_name} ${partner.last_name}`} className="image" />
              </TableCell>
              <TableCell>{`${partner.first_name} ${partner.last_name}`}</TableCell>
              <TableCell>{partner.email}</TableCell>
              <TableCell>{partner.account_status}</TableCell>
              <TableCell>{partner.account_type}</TableCell>
              <TableCell>{partner.birth_date}</TableCell>
              <TableCell>
                <button onClick={() => handleToggleAccountStatus(partner.email)}>
                  {partner.account_status === "enabled" ? "Deshabilitar" : "Habilitar"}
                </button>
                <button onClick={() => handleDeleteAccount(partner.email)}>
                  Eliminar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PartnerTable;