import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function BillHistory() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = () => {
    axios
      .get("http://localhost:5000/bills")
      .then((res) => setBills(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#F1F5F9",
        }}
      >
        <h1>📄 Bill History</h1>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            background: "#fff",
          }}
        >
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.length > 0 ? (
              bills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>{bill.customer_name}</td>
                  <td>
                    {new Date(bill.bill_date).toLocaleString()}
                  </td>
                  <td>₹{bill.grand_total}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/invoice/${bill.id}`)
                      }
                      style={{
                        padding: "8px 15px",
                        background: "#2563EB",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      👁 View Invoice
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Bills Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BillHistory;