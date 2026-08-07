import {
  HiCube,
  HiCheckCircle,
  HiExclamationCircle,
  HiCurrencyRupee,
  HiTrendingUp,
} from "react-icons/hi";

const stats = [
  {
    title: "Total Products",
    value: "350",
    sub: "+20 Added this month",
    icon: HiCube,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "In Stock",
    value: "320",
    sub: "Available Products",
    icon: HiCheckCircle,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Low Stock",
    value: "15",
    sub: "Need Restock",
    icon: HiExclamationCircle,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Inventory Value",
    value: "₹2.35L",
    sub: "Current Stock Value",
    icon: HiCurrencyRupee,
    color: "from-purple-500 to-violet-600",
  },
];

function ProductStats() {
  return (
    <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="group rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                  {item.value}
                </h2>

                <div className="mt-4 flex items-center gap-2 text-emerald-600">
                  <HiTrendingUp />
                  <span className="text-sm font-medium">
                    {item.sub}
                  </span>
                </div>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-xl transition-all duration-300 group-hover:scale-110`}
              >
                <Icon className="text-3xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductStats;