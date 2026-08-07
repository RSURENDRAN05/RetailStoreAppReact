import {
  HiUsers,
  HiUserAdd,
  HiBadgeCheck,
  HiLocationMarker,
  HiTrendingUp,
} from "react-icons/hi";

const stats = [
  {
    title: "Total Customers",
    value: "120",
    sub: "+12 this month",
    icon: HiUsers,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "New Customers",
    value: "15",
    sub: "+5 this week",
    icon: HiUserAdd,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Active Customers",
    value: "108",
    sub: "90% Active",
    icon: HiBadgeCheck,
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Cities Covered",
    value: "12",
    sub: "Across Tamil Nadu",
    icon: HiLocationMarker,
    color: "from-orange-500 to-amber-600",
  },
];

function CustomerStats() {
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
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-xl transition duration-300 group-hover:scale-110`}
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

export default CustomerStats;