import { HiPlus } from "react-icons/hi";

function ProductHeader({ onAddProduct }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-600 p-6 text-white shadow-2xl md:flex-row md:items-center">

      <div>
        <h1 className="text-3xl font-bold">
          📦 Product Management
        </h1>

        <p className="mt-2 text-blue-100">
          Manage your products, stock, pricing and inventory easily.
        </p>
      </div>

      <button
        onClick={onAddProduct}
        className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <HiPlus className="text-xl" />
        Add Product
      </button>

    </div>
  );
}

export default ProductHeader;