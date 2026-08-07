import Layout from "../components/Layout";
import Card from "../components/Card";
import { HiOutlineSearch, HiOutlineEye, HiOutlinePrinter } from "react-icons/hi";

function BillHistory() {
  const bills = [
    {
      id: "INV001",
      customer: "Rahul",
      date: "07-08-2026",
      amount: 560,
      status: "Paid",
    },
    {
      id: "INV002",
      customer: "Kumar",
      date: "07-08-2026",
      amount: 820,
      status: "Paid",
    },
    {
      id: "INV003",
      customer: "Arun",
      date: "06-08-2026",
      amount: 1200,
      status: "Paid",
    },
  ];

  return (
    <Layout title="Bill History">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🧾 Bill History
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          View all generated invoices
        </p>
      </div>

      <Card>

        <div className="relative mb-6">
          <HiOutlineSearch className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

          <input
            type="text"
            placeholder="Search Invoice..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">

                <th className="p-3 text-left">Invoice</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>

              </tr>
            </thead>

            <tbody>

              {bills.map((bill) => (

                <tr
                  key={bill.id}
                  className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                >

                  <td className="p-3 font-semibold">{bill.id}</td>

                  <td className="p-3">{bill.customer}</td>

                  <td className="p-3">{bill.date}</td>

                  <td className="p-3 font-bold text-green-600">
                    ₹{bill.amount}
                  </td>

                  <td className="p-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      {bill.status}
                    </span>
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-3">

                      <button className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200">
                        <HiOutlineEye className="h-5 w-5" />
                      </button>

                      <button className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200">
                        <HiOutlinePrinter className="h-5 w-5" />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </Card>

    </Layout>
  );
}

export default BillHistory;