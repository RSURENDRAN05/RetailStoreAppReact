import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Billing() {
  const [customers] = useState([
    { id: 1, name: "Rahul" },
    { id: 2, name: "Kumar" },
    { id: 3, name: "Arun" },
  ]);

  const [products] = useState([
    { id: 1, name: "Rice", price: 60 },
    { id: 2, name: "Oil", price: 180 },
    { id: 3, name: "Sugar", price: 48 },
  ]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [billItems, setBillItems] = useState([]);

  const addItem = () => {
    if (!productId) {
      alert("Select a Product");
      return;
    }

    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (!product) return;

    const newItem = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: Number(quantity),
      total: product.price * Number(quantity),
    };

    setBillItems([...billItems, newItem]);

    setProductId("");
    setQuantity(1);
  };

  const grandTotal = billItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const saveBill = () => {
    if (!customerId) {
      alert("Select Customer");
      return;
    }

    if (billItems.length === 0) {
      alert("Add at least one Product");
      return;
    }

    alert("✅ Bill Saved Successfully (Frontend Demo)");

    setCustomerId("");
    setProductId("");
    setQuantity(1);
    setBillItems([]);
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
        <h1>🧾 Billing</h1>

        <div style={{ marginBottom: "20px" }}>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          >
            <option value="">Select Customer</option>

            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          >
            <option value="">Select Product</option>

            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - ₹{p.price}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{
              padding: "10px",
              width: "80px",
              marginRight: "10px",
            }}
          />

          <button
            onClick={addItem}
            style={{
              padding: "10px 20px",
              background: "#16A34A",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ➕ Add Item
          </button>
        </div>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
          }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {billItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.total}</td>
              </tr>
            ))}

            {billItems.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Items Added
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <h2 style={{ marginTop: "20px" }}>
          Grand Total : ₹{grandTotal}
        </h2>

        <button
          onClick={saveBill}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          💾 Save Bill
        </button>
      </div>
    </div>
  );
}

export default Billing;