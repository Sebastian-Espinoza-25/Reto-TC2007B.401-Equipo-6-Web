import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import "../styles/TableStyles.css";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orderitems/${orderNumber}`);
        const data = await response.json();
        setOrderItems(data);
        setSelectedOrder(orderNumber);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>Shipping Address</TableCell>
            <TableCell>Shipping Status</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <React.Fragment key={order.order_number}>
              <TableRow>
                <TableCell>{order.order_number}</TableCell>
                <TableCell>{order.user_email}</TableCell>
                <TableCell>{order.shipping_address}</TableCell>
                <TableCell>{order.shipping_status}</TableCell>
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{order.delivery_date}</TableCell>
                <TableCell>{order.total_price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleDetailClick(order.order_number)}
                  >
                    {selectedOrder === order.order_number ? "Hide Details" : "View Details"}
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
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orderItems.map((item) => (
                              <TableRow key={item.order_item_id}>
                                <TableCell>{item.product_sku}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price}</TableCell>
                              </TableRow>
                            ))}
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
    </TableContainer>
  );
};

export default OrdersTable;