import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import Layout from "../components/Layout";
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";

function BillHistory() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = () => {
    axios
      .get("http://localhost:5000/bills")
      .then((res) => setBills(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const columns = [
    { key: "id", header: "Bill ID", cell: (r) => r.id },
    { key: "customer", header: "Customer", cell: (r) => r.customer_name },
    {
      key: "date",
      header: "Date",
      cell: (r) => new Date(r.bill_date).toLocaleString(),
    },
    { key: "total", header: "Total", cell: (r) => `₹${r.grand_total}` },
    {
      key: "action",
      header: "Action",
      cell: (r) => (
        <button
          onClick={() => navigate(`/invoice/${r.id}`)}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-300"
        >
          <HiOutlineEye className="h-3.5 w-3.5" /> View Invoice
        </button>
      ),
    },
  ];

  return (
    <Layout title="Bill History">
      {loading ? (
        <Loader label="Loading bills..." />
      ) : (
        <DataTable columns={columns} rows={bills} emptyMessage="No Bills Found" />
      )}
    </Layout>
  );
}

export default BillHistory;
