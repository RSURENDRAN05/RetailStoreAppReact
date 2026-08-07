import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  HiOutlineDownload,
  HiOutlineReceiptTax,
  HiOutlineCurrencyRupee,
  HiOutlineUsers,
  HiOutlineCube,
} from "react-icons/hi";

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
      total_customers: 182,
      total_products: 96,
    },

    products: [
      { name: "Rice", quantity_sold: 45 },
      { name: "Oil", quantity_sold: 28 },
      { name: "Sugar", quantity_sold: 35 },
      { name: "Soap", quantity_sold: 20 },
      { name: "Milk", quantity_sold: 18 },
    ],
  });

  const COLORS = [
    "#4f46e5",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#9333ea",
  ];

  const tooltipStyle = {
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("STORE BILLING SYSTEM", 14, 15);

    doc.setFontSize(13);
    doc.text("Sales Report", 14, 25);

    doc.text(
      `Date : ${new Date().toLocaleDateString()}`,
      14,
      35
    );

    doc.text(
      `Total Bills : ${report.summary.total_bills}`,
      14,
      45
    );

    doc.text(
      `Total Sales : ₹${report.summary.total_sales}`,
      14,
      55
    );

    autoTable(doc, {
      startY: 70,
      head: [["Product", "Quantity Sold"]],
      body: report.products.map((p) => [
        p.name,
        p.quantity_sold,
      ]),
    });

    doc.save("Sales_Report.pdf");
  };

  return (
    <Layout title="Reports">

      {/* Hero Banner */}

      <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <p className="text-sm uppercase tracking-widest text-blue-100">
              STORE ANALYTICS
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Business Reports
            </h1>

            <p className="mt-3 max-w-xl text-blue-100">
              Monitor revenue, orders, customers
              and products with real-time insights.
            </p>

          </div>

          <Button onClick={downloadPDF}>
            <HiOutlineDownload className="mr-2 h-5 w-5" />
            Export PDF
          </Button>

        </div>

      </div>      {/* Summary Cards */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

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

        <StatCard
          label="Customers"
          value={report.summary.total_customers}
          icon={<HiOutlineUsers />}
          accent="amber"
        />

        <StatCard
          label="Products"
          value={report.summary.total_products}
          icon={<HiOutlineCube />}
          accent="rose"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <Card title="📈 Product Sales">

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={report.products}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip contentStyle={tooltipStyle} />

                <Legend />

                <Bar
                  dataKey="quantity_sold"
                  fill="#4f46e5"
                  radius={[8,8,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

        <Card title="🥧 Product Share">

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={report.products}
                  dataKey="quantity_sold"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  {report.products.map((item,index)=>(
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip contentStyle={tooltipStyle} />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>      {/* Bottom Section */}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Top Selling Products */}

        <Card title="🏆 Top Selling Products">

          <div className="space-y-4">

            {report.products.map((item, index) => (

              <div key={index}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {item.name}
                  </span>

                  <span className="font-bold">
                    {item.quantity_sold}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                    style={{
                      width: `${(item.quantity_sold / 45) * 100}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </Card>

        {/* Recent Activity */}

        <Card title="🕒 Recent Activity">

          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Invoice #1001 Created</span>
              <span className="text-slate-500">10:20 AM</span>
            </div>

            <div className="flex justify-between">
              <span>Customer Added</span>
              <span className="text-slate-500">11:45 AM</span>
            </div>

            <div className="flex justify-between">
              <span>Rice Stock Updated</span>
              <span className="text-slate-500">01:10 PM</span>
            </div>

            <div className="flex justify-between">
              <span>Invoice #1002 Paid</span>
              <span className="text-slate-500">03:30 PM</span>
            </div>

            <div className="flex justify-between">
              <span>Daily Report Generated</span>
              <span className="text-slate-500">05:00 PM</span>
            </div>

          </div>

        </Card>

      </div>

    </Layout>
  );
}

export default Reports;