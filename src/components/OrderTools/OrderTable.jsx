import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { motion } from "framer-motion";
import "../styles/TableStyles.css";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [visibleUserDetails, setVisibleUserDetails] = useState({});
  const [filterStatus, setFilterStatus] = useState("");
  const [editOrder, setEditOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDetailClick = async (orderNumber) => {
    if (selectedOrder === orderNumber) {
      setSelectedOrder(null);
      setOrderItems([]);
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/orderitems/${orderNumber}`
        );
        const data = await response.json();
        setOrderItems(data);
        setSelectedOrder(orderNumber);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    }
  };

  const handleUserDetailsClick = async (userEmail, orderNumber) => {
    if (visibleUserDetails[orderNumber]) {
      setVisibleUserDetails((prevState) => ({
        ...prevState,
        [orderNumber]: false,
      }));
      setUserDetails({});
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${userEmail}`
        );
        const data = await response.json();
        setUserDetails(data);
        setVisibleUserDetails((prevState) => ({
          ...prevState,
          [orderNumber]: true,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleEditClick = (order) => {
    setEditOrder(order);
    setNewStatus(order.shipping_status);
    setOpenDialog(true);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditOrder(null);
  };

  const handleDialogConfirm = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/orders/${editOrder.order_number}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shipping_status: newStatus }),
        }
      );
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_number === editOrder.order_number
              ? { ...order, shipping_status: newStatus }
              : order
          )
        );
      } else {
        console.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
    setOpenDialog(false);
    setEditOrder(null);
  };

  const filteredOrders = filterStatus
    ? orders.filter((order) => order.shipping_status === filterStatus)
    : orders;

  const getStatusColor = (status) => {
    switch (status) {
      case "entregado":
        return "green";
      case "pendiente":
        return "orange";
      case "en camino":
        return "blue";
      case "en fabricación":
        return "purple";
      case "cancelado":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <TableContainer component={Paper}>
      <div className="filter-container">
        <h2>Órdenes Totales: {filteredOrders.length}</h2>
        <Select value={filterStatus} onChange={handleFilterChange} displayEmpty>
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="entregado">Entregado</MenuItem>
          <MenuItem value="pendiente">Pendiente</MenuItem>
          <MenuItem value="en camino">En Camino</MenuItem>
          <MenuItem value="en fabricación">En Fabricación</MenuItem>
          <MenuItem value="cancelado">Cancelado</MenuItem>
        </Select>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>User Details</TableCell>
            <TableCell>Shipping Status</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map((order) => (
            <React.Fragment key={order.order_number}>
              <TableRow>
                <TableCell>{order.order_number}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleUserDetailsClick(
                        order.user_email,
                        order.order_number
                      )
                    }
                  >
                    {visibleUserDetails[order.order_number]
                      ? "Hide Details"
                      : "View Details"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: getStatusColor(order.shipping_status),
                    }}
                    onClick={() => handleEditClick(order)}
                  >
                    {order.shipping_status}
                  </Button>
                </TableCell>
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{order.delivery_date}</TableCell>
                <TableCell>${order.total_price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleDetailClick(order.order_number)}
                  >
                    {selectedOrder === order.order_number
                      ? "Hide Details"
                      : "View Details"}
                  </Button>
                </TableCell>
              </TableRow>
              {selectedOrder === order.order_number && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Product SKU</TableCell>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orderItems.map((item) => (
                              <TableRow key={item.order_item_id}>
                                <TableCell>{item.product_sku}</TableCell>
                                <TableCell>{item.product_name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
              {visibleUserDetails[order.order_number] && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Email</TableCell>
                              <TableCell>Phone</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Gender</TableCell>
                              <TableCell>Address</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{userDetails.email}</TableCell>
                              <TableCell>{userDetails.phone}</TableCell>
                              <TableCell>
                                {userDetails.first_name} {userDetails.last_name}
                              </TableCell>
                              <TableCell>{userDetails.gender}</TableCell>
                              <TableCell>{order.shipping_address}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the shipping status to "{newStatus}
            "?
          </DialogContentText>
          <Select value={newStatus} onChange={handleStatusChange} fullWidth>
            <MenuItem value="entregado">Entregado</MenuItem>
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="en camino">En Camino</MenuItem>
            <MenuItem value="en fabricación">En Fabricación</MenuItem>
            <MenuItem value="cancelado">Cancelado</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default OrdersTable;
