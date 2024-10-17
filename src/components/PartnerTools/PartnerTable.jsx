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
    const value = event.target.value === "true" ? true : false;
    setNewStatus(value);
    console.log("New status set to:", value); // Imprimir en consola cuando se actualiza newStatus
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditPartner(null);
  };

  const handleDialogConfirm = async () => {
    console.log("Confirming new status:", newStatus); // Imprimir en consola cuando se confirma el diálogo
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/partners/email/${editPartner.email}/account_status`,
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

  const handleDeleteClick = async (email) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este socio?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/partners/email/${email}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setPartners((prevPartners) =>
            prevPartners.filter((partner) => partner.email !== email)
          );
          alert("Socio eliminado exitosamente");
        } else {
          console.error("Error al eliminar el socio");
          alert("Error al eliminar el socio");
        }
      } catch (error) {
        console.error("Error al eliminar el socio:", error);
        alert("Error al eliminar el socio");
      }
    }
  };

  const filteredPartners = partners
    .filter(
      (partner) =>
        `${partner.first_name} ${partner.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((partner) => {
      const filterStatus =
        filterAccountStatus === "true"
          ? true
          : filterAccountStatus === "false"
          ? false
          : null;
      return filterStatus !== null
        ? partner.account_status === filterStatus
        : true;
    })
    .filter((partner) =>
      filterAccountType ? partner.account_type === filterAccountType : true
    );

  const getStatusColor = (status) => {
    return status === true ? "green" : "red";
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
            <MenuItem className="filter-item" value="">
              Todos
            </MenuItem>
            <MenuItem className="filter-item" value="true">
              Habilitada
            </MenuItem>
            <MenuItem className="filter-item" value="false">
              Deshabilitada
            </MenuItem>
          </Select>
          <Select
            value={filterAccountType}
            onChange={handleAccountTypeFilterChange}
            displayEmpty
            className="filter-select"
          >
            <MenuItem className="filter-item" value="">
              Todos
            </MenuItem>
            <MenuItem className="filter-item" value="admin">
              Admin
            </MenuItem>
            <MenuItem className="filter-item" value="experto">
              Experto
            </MenuItem>
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
                  {partner.account_status === true
                    ? "Habilitada"
                    : "Deshabilitada"}
                </Button>
              </TableCell>
              <TableCell>{partner.account_type}</TableCell>
              <TableCell>{partner.birth_date}</TableCell>
              <TableCell>
                <button
                  className="enable-disable-btn"
                  onClick={() => handleDeleteClick(partner.email)}
                >
                  Eliminar
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
          <Select value={newStatus.toString()} onChange={handleStatusChange} fullWidth>
            <MenuItem value="true">Habilitada</MenuItem>
            <MenuItem value="false">Deshabilitada</MenuItem>
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