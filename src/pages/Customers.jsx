import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rahul",
      phone: "9876543210",
      address: "Chennai",
    },
    {
      id: 2,
      name: "Kumar",
      phone: "9123456780",
      address: "Trichy",
    },
    {
      id: 3,
      name: "Arun",
      phone: "9876501234",
      address: "Madurai",
    },
  ]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Add Customer
  const addCustomer = () => {
    if (!name || !phone || !address) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name,
      phone,
      address,
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setPhone("");
    setAddress("");

    alert("✅ Customer Added Successfully");
  };

  // Edit Customer
  const editCustomer = (customer) => {
    setEditId(customer.id);
    setName(customer.name);
    setPhone(customer.phone);
    setAddress(customer.address);
  };

  // Update Customer
  const updateCustomer = () => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === editId
        ? {
            ...customer,
            name,
            phone,
            address,
          }
        : customer
    );

    setCustomers(updatedCustomers);

    setEditId(null);
    setName("");
    setPhone("");
    setAddress("");

    alert("✅ Customer Updated Successfully");
  };

  // Delete Customer
  const deleteCustomer = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    setCustomers(customers.filter((customer) => customer.id !== id));

    alert("🗑 Customer Deleted Successfully");
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1>👥 Customer Management</h1>

        <input
          type="text"
          placeholder="🔍 Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <br />

        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", margin: "10px" }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: "10px", margin: "10px" }}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px",
            width: "250px",
          }}
        />

        <button
          onClick={editId ? updateCustomer : addCustomer}
          style={{
            padding: "10px 20px",
            background: editId ? "#2563EB" : "#16A34A",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editId ? "💾 Update Customer" : "➕ Add Customer"}
        </button>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            marginTop: "30px",
            borderCollapse: "collapse",
            background: "white",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>

                <td>
                  <button
                    onClick={() => editCustomer(customer)}
                    style={{
                      background: "#16A34A",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    style={{
                      background: "#DC2626",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;