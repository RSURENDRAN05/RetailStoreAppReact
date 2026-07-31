import { useState, useRef } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";

function Login() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [logo, setLogo] = useState(
    localStorage.getItem("storeLogo") || loginImage
  );
const login = () => {
  if (!username || !password) {
    alert("Please enter Username and Password");
    return;
  }

  if (username === "admin" && password === "admin") {
    alert("✅ Login Successful");
    navigate("/dashboard");
  } else {
    alert("❌ Invalid Username or Password");
  }
};

  const chooseLogo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const image = reader.result;

      setLogo(image);

      localStorage.setItem("storeLogo", image);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #2563EB, #0F172A)",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "rgba(255,255,255,0.95)",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={chooseLogo}
          style={{ display: "none" }}
        />

        {/* Logo */}
        <img
          src={logo}
          alt="Store Logo"
          style={{
            width: "140px",
            height: "140px",
            objectFit: "contain",
            display: "block",
            margin: "0 auto 15px",
            borderRadius: "10px",
          }}
        />

        {/* Choose Logo Button */}
        <button
          onClick={() => fileInputRef.current.click()}
          style={{
            display: "block",
            margin: "0 auto 20px",
            background: "#16A34A",
            color: "white",
            border: "none",
            padding: "8px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📷 Choose Logo
        </button>

        <h2
          style={{
            textAlign: "center",
            color: "#1E3A8A",
            marginBottom: "25px",
          }}
        >
          Store Billing System
        </h2>

        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #CBD5E1",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #CBD5E1",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#64748B",
            fontSize: "14px",
          }}
        >
          © 2026 Store Billing Management System
        </p>
      </div>
    </div>
  );
}

export default Login;