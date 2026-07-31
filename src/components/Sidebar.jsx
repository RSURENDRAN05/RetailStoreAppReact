import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#1E293B",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2>🏪 Store Billing</h2>
      <hr />

      <p>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          🏠 Dashboard
        </Link>
      </p>

      <p>
        <Link to="/customers" style={{ color: "white", textDecoration: "none" }}>
          👥 Customers
        </Link>
      </p>

      <p>
        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          📦 Products
        </Link>
      </p>

      <p>
        <Link to="/billing" style={{ color: "white", textDecoration: "none" }}>
          🧾 Billing
          <li>
  <Link to="/bill-history">📄 Bill History</Link>
</li>
        </Link>
      </p>

      <p>
        <Link to="/reports" style={{ color: "white", textDecoration: "none" }}>
          📊 Reports
        </Link>
      </p>

      <p>
        <Link to="/settings" style={{ color: "white", textDecoration: "none" }}>
          ⚙️ Settings
        </Link>
      </p>
    </div>
  );
}

export default Sidebar;