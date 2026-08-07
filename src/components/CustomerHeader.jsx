import { HiPlus } from "react-icons/hi";

function CustomerHeader({ onAddCustomer }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-2xl md:flex-row md:items-center">

      <div>
        <h1 className="text-3xl font-bold">
          👥 Customer Management
        </h1>

        <p className="mt-2 text-blue-100">
          Manage all your customers quickly and efficiently.
        </p>
      </div>

      <button
        onClick={onAddCustomer}
        className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <HiPlus className="text-xl" />
        Add Customer
      </button>

    </div>
  );
}

export default CustomerHeader;