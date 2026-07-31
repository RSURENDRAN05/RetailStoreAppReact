import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [stats] = useState({
    totalCustomers: 150,
    totalProducts: 85,
    totalBills: 420,
    totalSales: 185000,
  });

  const [lowStock] = useState([
    {
      id: 1,
      name: "Rice",
      price: 60,
      stock: 3,
    },
    {
      id: 2,
      name: "Oil",
      price: 180,
      stock: 5,
    },
    {
      id: 3,
      name: "Sugar",
      price: 48,
      stock: 2,
    },
  ]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#F1F5F9",
          padding: "30px",
        }}
      >
        <h1>📊 Dashboard</h1>
        <h3>Welcome Admin 👋</h3>

        {/* Dashboard Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "220px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>🧾 Total Bills</h3>
            <h2>{stats.totalBills}</h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "220px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>💰 Total Sales</h3>
            <h2>₹{stats.totalSales}</h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "220px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>👥 Customers</h3>
            <h2>{stats.totalCustomers}</h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "220px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>📦 Products</h3>
            <h2>{stats.totalProducts}</h2>
          </div>
        </div>

        {/* Low Stock */}
        <div
          style={{
            marginTop: "40px",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>⚠️ Low Stock Products</h2>

          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                background: "#2563EB",
                color: "white",
              }}
            >
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {lowStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.stock}</td>
                  <td
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    LOW STOCK
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;