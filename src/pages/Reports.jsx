import { useState } from "react";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
} from "recharts";

function Reports() {
  const [report] = useState({
    summary: {
      total_bills: 25,
      total_sales: 28500,
    },

    products: [
      {
        name: "Rice",
        quantity_sold: 45,
      },
      {
        name: "Oil",
        quantity_sold: 28,
      },
      {
        name: "Sugar",
        quantity_sold: 35,
      },
      {
        name: "Soap",
        quantity_sold: 20,
      },
      {
        name: "Milk",
        quantity_sold: 18,
      },
    ],
  });

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
      body: report.products.map((item) => [
        item.name,
        item.quantity_sold,
      ]),
    });

    doc.save("Sales_Report.pdf");
  };

  const COLORS = [
    "#2563EB",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#9333EA",
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#F1F5F9",
        }}
      >
        <h1>📊 Sales Reports</h1>

        <button
          onClick={downloadPDF}
          style={{
            marginTop: "15px",
            marginBottom: "20px",
            padding: "10px 20px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          📥 Download PDF Report
        </button>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "220px",
            }}
          >
            <h3>Total Bills</h3>
            <h2>{report.summary.total_bills}</h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "220px",
            }}
          >
            <h3>Total Sales</h3>
            <h2>₹{report.summary.total_sales}</h2>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>📈 Product Sales</h3>

            <BarChart
              width={500}
              height={300}
              data={report.products}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="quantity_sold"
                fill="#2563EB"
              />
            </BarChart>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>🥧 Product Share</h3>

            <PieChart width={350} height={300}>
              <Pie
                data={report.products}
                dataKey="quantity_sold"
                nameKey="name"
                outerRadius={100}
                label
              >
                {report.products.map((item, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;