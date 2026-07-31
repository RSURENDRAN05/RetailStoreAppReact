import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [settings, setSettings] = useState({
    store_name: "ABC Store",
    owner_name: "Tharun",
    phone: "9876543210",
    email: "abcstore@gmail.com",
    address: "Chennai, Tamil Nadu",
    gst: "33ABCDE1234F1Z5",
    invoice_footer: "Thank You! Visit Again.",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = () => {
    alert("✅ Settings Saved Successfully (Frontend Demo)");
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
        <h1>⚙ Store Settings</h1>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            maxWidth: "700px",
          }}
        >
          <label><b>🏪 Store Name</b></label>
          <input
            name="store_name"
            value={settings.store_name}
            onChange={handleChange}
            style={inputStyle}
          />

          <label><b>👤 Owner Name</b></label>
          <input
            name="owner_name"
            value={settings.owner_name}
            onChange={handleChange}
            style={inputStyle}
          />

          <label><b>📞 Phone Number</b></label>
          <input
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <label><b>📧 Email</b></label>
          <input
            name="email"
            value={settings.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <label><b>📍 Address</b></label>
          <textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
            rows="3"
            style={textareaStyle}
          />

          <label><b>🧾 GST Number</b></label>
          <input
            name="gst"
            value={settings.gst}
            onChange={handleChange}
            style={inputStyle}
          />

          <label><b>📝 Invoice Footer</b></label>
          <textarea
            name="invoice_footer"
            value={settings.invoice_footer}
            onChange={handleChange}
            rows="3"
            style={textareaStyle}
          />

          <button
            onClick={saveSettings}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            💾 Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "8px 0 18px",
  border: "1px solid #CBD5E1",
  borderRadius: "6px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  margin: "8px 0 18px",
  border: "1px solid #CBD5E1",
  borderRadius: "6px",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default Settings;