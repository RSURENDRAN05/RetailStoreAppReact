import { useState } from "react";
import {
  HiOutlineReceiptTax,
  HiOutlineCurrencyRupee,
  HiOutlineUsers,
  HiOutlineCube,
} from "react-icons/hi";
import Layout from "../components/Layout";
import Card, { StatCard } from "../components/Card";
import Badge from "../components/Badge";
import DataTable from "../components/DataTable";
import { formatCurrency } from "../utils/format";

function Dashboard() {
  const [stats] = useState({
    totalCustomers: 150,
    totalProducts: 85,
    totalBills: 420,
    totalSales: 185000,
  });

  const [lowStock] = useState([
    { id: 1, name: "Rice", price: 60, stock: 3 },
    { id: 2, name: "Oil", price: 180, stock: 5 },
    { id: 3, name: "Sugar", price: 48, stock: 2 },
  ]);

  const columns = [
    { key: "name", header: "Product", cell: (r) => r.name },
    { key: "price", header: "Price", cell: (r) => `₹${r.price}` },
    { key: "stock", header: "Stock", cell: (r) => r.stock },
    {
      key: "status",
      header: "Status",
      cell: () => <Badge tone="danger">Low Stock</Badge>,
    },
  ];

  return (
    <Layout title="Dashboard">
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Welcome back, Admin 👋 — here's what's happening in your store today.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Bills"
          value={stats.totalBills}
          icon={<HiOutlineReceiptTax />}
          accent="brand"
        />
        <StatCard
          label="Total Sales"
          value={formatCurrency(stats.totalSales)}
          icon={<HiOutlineCurrencyRupee />}
          accent="emerald"
        />
        <StatCard
          label="Customers"
          value={stats.totalCustomers}
          icon={<HiOutlineUsers />}
          accent="amber"
        />
        <StatCard
          label="Products"
          value={stats.totalProducts}
          icon={<HiOutlineCube />}
          accent="rose"
        />
      </div>

      <div className="mt-6">
        <Card title="Low Stock Products" icon="⚠️">
          <DataTable columns={columns} rows={lowStock} />
        </Card>
      </div>
    </Layout>
  );
}

export default Dashboard;
