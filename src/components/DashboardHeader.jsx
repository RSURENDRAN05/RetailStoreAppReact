import { useEffect, useState } from "react";
import {
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineClock,
} from "react-icons/hi";

function DashboardHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const currentDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-2xl">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            {greeting}, Tharun 👋
          </h1>

          <p className="mt-2 text-blue-100">
            Welcome to Retail ERP Billing Management System
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-6">

            <div className="flex items-center gap-2">
              <HiOutlineCalendar className="text-xl" />
              <span>{currentDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <HiOutlineClock className="text-xl" />
              <span>{currentTime}</span>
            </div>

          </div>
        </div>

        <div className="flex items-center gap-4">

          <button className="relative rounded-2xl bg-white/20 p-3 backdrop-blur-md transition hover:bg-white/30">
            <HiOutlineBell className="text-2xl" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default DashboardHeader;
