import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineCamera, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import loginImage from "../assets/login.png";
import { Input } from "../components/Input";
import Button from "../components/Button";
import { useToast } from "../context/ToastContext";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [shopId, setShopId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [logo, setLogo] = useState(
    localStorage.getItem("storeLogo") || loginImage
  );

  const login = (e) => {
    e.preventDefault();

    if (!shopId || !username || !password) {
  toast.error("Please enter Shop ID, Username and Password");
  return;
}

    if (
  shopId === "1" &&
  username === "admin" &&
  password === "admin"
) {
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      toast.error("Invalid Username or Password");
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-700 via-brand-600 to-slate-900 p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 lg:grid-cols-2">
        {/* Brand panel — desktop only */}
        <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-600 to-slate-900 p-10 text-white lg:flex">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur-sm">
              🏪
            </div>
            <h2 className="text-2xl font-bold leading-snug">
              Store Billing Management System
            </h2>
            <p className="mt-3 text-sm text-brand-100">
              Manage customers, products, billing and reports from one
              professional dashboard — built for desktop, tablet and mobile.
            </p>
          </div>
          <p className="text-xs text-brand-200">
            © 2026 Store Billing Management System
          </p>
        </div>

        {/* Form panel */}
        <form onSubmit={login} className="flex flex-col justify-center p-8 sm:p-10">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={chooseLogo}
            className="hidden"
          />

          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-700">
            <img
              src={logo}
              alt="Store Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="mx-auto mb-6 flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            <HiOutlineCamera className="h-4 w-4" />
            Choose Logo
          </button>

          <h1 className="mb-1 text-center text-xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Sign in to continue to your dashboard
          </p>

          <div className="space-y-4">
            <div className="relative">
              <HiOutlineUser className="pointer-events-none absolute left-3.5 top-[2.35rem] h-4 w-4 text-slate-400" />
              <div className="relative">
  <Input
    label="Shop ID"
    type="text"
    placeholder="SHOP001"
    value={shopId}
    onChange={(e) => setShopId(e.target.value)}
  />
</div><Input
                label="Username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <HiOutlineLockClosed className="pointer-events-none absolute left-3.5 top-[2.35rem] h-4 w-4 text-slate-400" />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="mt-6 w-full py-3 text-base">
            Login
          </Button>

          <p className="mt-6 text-center text-xs text-slate-400 lg:hidden">
            © 2026 Store Billing Management System
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
