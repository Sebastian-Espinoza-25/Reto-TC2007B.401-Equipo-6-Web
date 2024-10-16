import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "../styles/TableStyles.css";

const PartnerTable = () => {
  const [partners, setPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAccountStatus, setFilterAccountStatus] = useState("");
  const [filterAccountType, setFilterAccountType] = useState("");
  const [editPartner, setEditPartner] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/partners`
        );
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAccountStatusFilterChange = (event) => {
    setFilterAccountStatus(event.target.value);
  };

  const handleAccountTypeFilterChange = (event) => {
    setFilterAccountType(event.target.value);
  };

  const handleEditClick = (partner) => {
    setEditPartner(partner);
    setNewStatus(partner.account_status);
    setOpenDialog(true);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditPartner(null);
  };

  const handleDialogConfirm = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/partners/${editPartner.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account_status: newStatus }),
        }
      );
      if (response.ok) {
        setPartners((prevPartners) =>
          prevPartners.map((partner) =>
            partner.email === editPartner.email
              ? { ...partner, account_status: newStatus }
              : partner
          )
        );
      } else {
        console.error("Error updating account status");
      }
    } catch (error) {
      console.error("Error updating account status:", error);
    }
    setOpenDialog(false);
    setEditPartner(null);
  };

  const filteredPartners = partners
    .filter(
      (partner) =>
        `${partner.first_name} ${partner.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((partner) =>
      filterAccountStatus
        ? partner.account_status === filterAccountStatus
        : true
    )
    .filter((partner) =>
      filterAccountType ? partner.account_type === filterAccountType : true
    );

  const getStatusColor = (status) => {
    return status === "enabled" ? "green" : "red";
  };

  return (
    <TableContainer
      component={Paper}
      style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
    >
      <div className="filter-container">
        <h2>Colaboradores Totales: {filteredPartners.length}</h2>
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Buscar por nombre o email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <Select
            value={filterAccountStatus}
            onChange={handleAccountStatusFilterChange}
            displayEmpty
            className="filter-select"
          >
            <MenuItem className="filter-item"value="">Todos</MenuItem>
            <MenuItem className="filter-item"value="enabled">Habilitada</MenuItem>
            <MenuItem className="filter-item"value="disabled">Deshabilitada</MenuItem>
          </Select>
          <Select
            value={filterAccountType}
            onChange={handleAccountTypeFilterChange}
            displayEmpty
            className="filter-select"
          >
            <MenuItem className="filter-item"value="">Todos</MenuItem>
            <MenuItem className="filter-item"value="admin">Admin</MenuItem>
            <MenuItem className="filter-item"value="experto">Experto</MenuItem>
          </Select>
        </div>
      </div>
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
          {filteredPartners.map((partner) => (
            <TableRow key={partner.email}>
              <TableCell>
                <img
                  src={partner.profile_pic}
                  alt={`${partner.first_name} ${partner.last_name}`}
                  className="image"
                />
              </TableCell>
              <TableCell>{`${partner.first_name} ${partner.last_name}`}</TableCell>
              <TableCell>{partner.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: getStatusColor(partner.account_status),
                  }}
                  onClick={() => handleEditClick(partner)}
                >
                  {partner.account_status === "enabled"
                    ? "Habilitada"
                    : "Deshabilitada"}
                </Button>
              </TableCell>
              <TableCell>{partner.account_type}</TableCell>
              <TableCell>{partner.birth_date}</TableCell>
              <TableCell>
                <button className="enable-disable-btn"onClick={() => handleEditClick(partner)}>
                  {partner.account_status === "enabled"
                    ? "Deshabilitar"
                    : "Habilitar"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmar Cambio de Estado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas cambiar el estado de la cuenta a "
            {newStatus}"?
          </DialogContentText>
          <Select value={newStatus} onChange={handleStatusChange} fullWidth>
            <MenuItem value="enabled">Habilitada</MenuItem>
            <MenuItem value="disabled">Deshabilitada</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDialogConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default PartnerTable;
