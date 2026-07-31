import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Invoice() {
  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const billRes = await axios.get(`http://localhost:5000/bills/${id}`);
      setBill(billRes.data);

      const settingRes = await axios.get("http://localhost:5000/settings");
      setSettings(settingRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!bill || !settings) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "30px",
        background: "#fff",
        border: "1px solid #ddd",
      }}
    >
      {/* Store Details */}

      <div style={{ textAlign: "center" }}>
        <h1>{settings.store_name.toUpperCase()}</h1>

        <p>
          <b>Owner :</b> {settings.owner_name}
        </p>

        <p>
          <b>Phone :</b> {settings.phone}
        </p>

        <p>
          <b>Email :</b> {settings.email}
        </p>

        <p>
          <b>Address :</b> {settings.address}
        </p>

        <p>
          <b>GST :</b> {settings.gst}
        </p>

        <hr />
      </div>

      {/* Bill Details */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3>Customer : {bill.customer_name}</h3>
        </div>

        <div style={{ textAlign: "right" }}>
          <h3>Invoice No : {bill.id}</h3>
          <p>{new Date(bill.bill_date).toLocaleString()}</p>
        </div>
      </div>

      {/* Items */}

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {bill.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Grand Total */}

      <div
        style={{
          textAlign: "right",
          marginTop: "20px",
        }}
      >
        <h2>Grand Total : ₹{bill.grand_total}</h2>
      </div>

      <hr />

      {/* Footer */}

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <h3>{settings.invoice_footer}</h3>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            padding: "12px 30px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🖨 Print Invoice
        </button>
      </div>
    </div>
  );
}

export default Invoice;