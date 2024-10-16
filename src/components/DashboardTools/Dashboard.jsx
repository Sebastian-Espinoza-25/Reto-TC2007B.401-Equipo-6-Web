import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/Dashboard.css";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Sales",
          data: [],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: 5,
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [],
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 1,
            gradientToColors: ["#00f", "#f00"],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        colors: ["#800080"],
        tooltip: {
          theme: "light",
          x: {
            show: true,
            format: "dd MMM",
          },
          y: {
            formatter: (val) => `$${val}`,
          },
        },
        grid: {
          borderColor: "#e9ecef",
        },
      },
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
      const data = await response.json();
      const orderDates = data.map((order) => order.order_date);
      const orderSales = data.map((order) => order.total_price);

      this.setState({
        series: [
          {
            name: "Ventas",
            data: orderSales,
          },
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: orderDates,
          },
        },
      });

      this.props.onOrdersFetched(data);
    } catch (error) {
      console.error("Error descargando ordenes:", error);
    }
  };

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

const TopProductsChart = ({ topProducts }) => {
  const colors = ["#00aaff", "#ffaa00", "#aa00ff", "#ff0077", "#00ff77"];

  const topProductsData = {
    series: [
      {
        data: topProducts.map((product) => product.count),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: topProducts.map((product) => product.product_name),
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
      colors: colors,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={topProductsData.options}
        series={topProductsData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [posts, setPosts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchPosts();
    fetchTopProducts();
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

  const fetchTopProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/orderitems/top-products`
      );
      const data = await response.json();
      setTopProducts(data);
    } catch (error) {
      console.error("Error fetching top products:", error);
    }
  };

  return (
    <div className="view">
      <div className="dashboard-content">
        <div className="charts">
          <div className="chart">
            <h2>Órdenes</h2>
            <ApexChart onOrdersFetched={setOrders} />
          </div>
          <div className="chart">
            <h2>Top 5 Productos</h2>
            <TopProductsChart topProducts={topProducts} />
          </div>
        </div>
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
