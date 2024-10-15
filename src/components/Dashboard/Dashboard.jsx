import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "../styles/Dashboard.css";

// Registra los componentes necesarios de chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchPosts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const ordersData = {
    labels: orders.map(order => order.order_date),
    datasets: [
      {
        label: "Orders",
        data: orders.map(order => order.total_price),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="view">
        <div className="dashboard-content">
          <div className="charts">
            <div className="chart">
              <h2>Orders Overview</h2>
              <Line data={ordersData} />
            </div>
          </div>
          <div className="recent-orders">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>User Email</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.order_number}>
                    <td>{order.order_number}</td>
                    <td>{order.user_email}</td>
                    <td>{order.total_price}</td>
                    <td>{order.order_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="recent-posts">
            <h2>Recent Posts</h2>
            <ul>
              {posts.slice(0, 5).map((post) => (
                <li key={post.post_id}>{post.title}</li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;