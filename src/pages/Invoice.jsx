import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlinePrinter } from "react-icons/hi";
import Loader from "../components/Loader";

function Invoice() {
  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const billRes = await axios.get(`http://localhost:5000/bills/${id}`);
      setBill(billRes.data);

      const settingRes = await axios.get("http://localhost:5000/settings");
      setSettings(settingRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!bill || !settings) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
        <Loader label="Loading invoice..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 dark:bg-slate-950 print:bg-white print:p-0">
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10 print:max-w-none print:rounded-none print:border-none print:p-0 print:shadow-none">
        {/* Store Details */}
        <div className="border-b border-slate-100 pb-6 text-center dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {settings.store_name.toUpperCase()}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Owner:</span> {settings.owner_name}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Phone:</span> {settings.phone}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Email:</span> {settings.email}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Address:</span> {settings.address}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold">GST:</span> {settings.gst}
          </p>
        </div>

        {/* Bill Details */}
        <div className="flex flex-col justify-between gap-2 py-6 sm:flex-row">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Customer: {bill.customer_name}
          </h3>
          <div className="text-left sm:text-right">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Invoice No: {bill.id}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {new Date(bill.bill_date).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bill.items.map((item, index) => (
                <tr key={index} className="text-slate-700 dark:text-slate-300">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">₹{item.price}</td>
                  <td className="px-4 py-3">₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grand Total */}
        <div className="mt-6 text-right">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Grand Total: ₹{bill.grand_total}
          </h2>
        </div>

        <hr className="my-6 border-slate-100 dark:border-slate-800" />

        {/* Footer */}
        <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-400">
          {settings.invoice_footer}
        </p>

        <div className="mt-8 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            <HiOutlinePrinter className="h-4 w-4" />
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
