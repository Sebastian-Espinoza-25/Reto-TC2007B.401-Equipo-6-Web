import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";



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

  return (
    <div className="view">
      <div className="dashboard-content">
        <div className="recent-orders">
          <h2>Órdenes recientes</h2>
          <table>
            <thead>
              <tr>
                <th>Número de orden</th>
                <th>Email usuario</th>
                <th>Precio total</th>
                <th>fecha de orden</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.order_number}>
                  <td>{order.order_number}</td>
                  <td>{order.user_email}</td>
                  <td>${order.total_price}</td>
                  <td>{order.order_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="recent-posts">
          <h2>Posts Recientes</h2>
          <ul>
            {posts.slice(0, 5).map((post) => (
              <li key={post.post_id}>
                <strong>{post.title}</strong> - {post.date} -{" "}
                {post.partner_email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
