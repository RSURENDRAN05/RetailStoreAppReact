import { HiPrinter, HiReceiptTax } from "react-icons/hi";

function BillingHeader() {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white shadow-2xl md:flex-row md:items-center">

      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <HiReceiptTax className="text-4xl" />
          Billing System
        </h1>

        <p className="mt-2 text-emerald-100">
          Create invoices, manage billing and print receipts quickly.
        </p>
      </div>

      <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-700 shadow-lg transition hover:scale-105">
        <HiPrinter className="text-xl" />
        Print Bill
      </button>

    </div>
  );
}

export default BillingHeader;