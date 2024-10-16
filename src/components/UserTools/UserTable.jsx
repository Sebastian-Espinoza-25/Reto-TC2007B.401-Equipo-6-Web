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
import "../styles/TableStyles.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [ordersCount, setOrdersCount] = useState({});
  const [filterGender, setFilterGender] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchOrdersCount = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/orders/count`
        );
        const data = await response.json();
        const ordersCountMap = data.reduce((acc, order) => {
          acc[order.user_email] = order.count;
          return acc;
        }, {});
        setOrdersCount(ordersCountMap);
      } catch (error) {
        console.error("Error fetching orders count:", error);
      }
    };

    fetchUsers();
    fetchOrdersCount();
  }, []);

  const handleFilterChange = (event) => {
    setFilterGender(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users
    .filter((user) => (filterGender ? user.gender === filterGender : true))
    .filter(
      (user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <TableContainer
      component={Paper}
      style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
    >
      <div className="filter-container">
        <h2>Usuarios Totales: {filteredUsers.length}</h2>
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Buscar por nombre o email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <Select
            value={filterGender}
            onChange={handleFilterChange}
            displayEmpty
            className="filter-select"
          >
            <MenuItem className="filter-item"value="">Todos</MenuItem>
            <MenuItem className="filter-item"value="male">Masculino</MenuItem>
            <MenuItem className="filter-item"value="female">Femenino</MenuItem>
            <MenuItem className="filter-item"value="other">Otro</MenuItem>
          </Select>
        </div>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell>Nombre y Apellido</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Género</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
            <TableCell>Pedidos Realizados</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.email}>
              <TableCell>
                <img
                  src={user.profile_pic}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="image"
                />
              </TableCell>
              <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.birth_date}</TableCell>
              <TableCell>{ordersCount[user.email] || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
