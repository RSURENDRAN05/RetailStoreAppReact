import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { HiOutlineDownload, HiOutlineReceiptTax, HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../components/Layout";
import Card, { StatCard } from "../components/Card";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";

function Reports() {
  const [report] = useState({
    summary: {
      total_bills: 25,
      total_sales: 28500,
    },
    products: [
      { name: "Rice", quantity_sold: 45 },
      { name: "Oil", quantity_sold: 28 },
      { name: "Sugar", quantity_sold: 35 },
      { name: "Soap", quantity_sold: 20 },
      { name: "Milk", quantity_sold: 18 },
    ],
  });

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("STORE BILLING SYSTEM", 14, 15);

    doc.setFontSize(13);
    doc.text("Sales Report", 14, 25);

    doc.text(`Date : ${new Date().toLocaleDateString()}`, 14, 35);
    doc.text(`Total Bills : ${report.summary.total_bills}`, 14, 45);
    doc.text(`Total Sales : ₹${report.summary.total_sales}`, 14, 55);

    autoTable(doc, {
      startY: 70,
      head: [["Product", "Quantity Sold"]],
      body: report.products.map((item) => [item.name, item.quantity_sold]),
    });

    doc.save("Sales_Report.pdf");
  };

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#9333ea"];

  const tooltipStyle = {
    borderRadius: "0.75rem",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
    fontSize: "13px",
    padding: "8px 12px",
  };

  return (
    <Layout title="Sales Reports">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Overview of sales performance across all products.
        </p>
        <Button onClick={downloadPDF}>
          <HiOutlineDownload className="h-4 w-4" />
          Download PDF Report
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Total Bills"
          value={report.summary.total_bills}
          icon={<HiOutlineReceiptTax />}
          accent="brand"
        />
        <StatCard
          label="Total Sales"
          value={formatCurrency(report.summary.total_sales)}
          icon={<HiOutlineCurrencyRupee />}
          accent="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card title="Product Sales" icon="📈">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.products} barCategoryGap="28%">
                <defs>
                  <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#4f46e5", fillOpacity: 0.06 }}
                  contentStyle={tooltipStyle}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }}
                />
                <Bar
                  dataKey="quantity_sold"
                  name="Quantity Sold"
                  fill="url(#barFill)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Product Share" icon="🥧">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={report.products}
                  dataKey="quantity_sold"
                  nameKey="name"
                  outerRadius="80%"
                  isAnimationActive={false}
                  label
                >
                  {report.products.map((item, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default Reports;
