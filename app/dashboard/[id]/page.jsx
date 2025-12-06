"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Gift,
  Settings,
  Globe,
  Eye,
  Clock,
  HelpCircle,
  Menu,
  Search,
  ShoppingCartIcon,
  User,
  X,
  Zap,
  PlusCircle,
  DollarSign,
} from "lucide-react";
const fadeinup = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
import { Chart } from "react-google-charts";
const Header = () => {
  const [ismenuopen, setismenuopen] = useState(false);
  const [notification, setnotification] = useState(3);
  const router = useRouter();
  return (
    <motion.header
      {...fadeinup}
      className="flex justify-between items-center p-4 bg-gray-900 text-white"
    >
      <div className="flex items-center space-x-8">
        <motion.span
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold text-blue-500"
        >
          TradePro
        </motion.span>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <a
                href="/"
                className="text-blue-500 hover:text-blue-400 trnsition-colors font-semibold flex items-center"
              >
                <Zap className="mr-1" size={16} />
                Explore
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-blue-500 hover:text-blue-400 trnsition-colors font-semibold flex items-center"
              >
                <Globe className="mr-1" size={16} />
                Investment
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-blue-500 hover:text-blue-400 trnsition-colors font-semibold flex items-center"
              >
                <BookOpen className="mr-1" size={16} />
                Learn
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="What are you looking for"
            className="pl-10 pr-2 py-2 bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="relative cursor-pointer"
        >
          <Bell className="text-gray-300 hover:text-blue-500 transition-colors" />
          {notification > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute -top-1 bg-red-500 text-white text-l rounded-full w-4 h-4 flex items-center justify-center"
            >
              {notification}
            </motion.span>
          )}
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <ShoppingCartIcon className="text-gray-300 hover:text-blue-500 transition-colors relative cursor-pointer" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <User className="text-gray-300 hover:text-blue-500 transition-colors relative cursor-pointer" />
        </motion.div>
      </div>
      <div className="md:hidden">
        <motion.button
          onClick={() => setismenuopen(!ismenuopen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {ismenuopen ? <X /> : <Menu />}
        </motion.button>
      </div>
      <AnimatePresence>
        {ismenuopen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0 h-full w-64 bg-gray-800 p-4 z-50"
          >
            <motion.button
              onClick={() => setismenuopen(false)}
              className="absolute top-4 right-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X />
            </motion.button>
            <nav className="mt-8">
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"
                  >
                    <Zap className="mr-2" size={16} />
                    Explore
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"
                  >
                    <Globe className="mr-2" size={16} />
                    Investments
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"
                  >
                    <BookOpen className="mr-2" size={16} />
                    Learn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"
                  >
                    <Gift className="mr-2" size={16} />
                    Rewards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"
                  >
                    <HelpCircle className="mr-2" size={16} />
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"
                  >
                    <Settings className="mr-2" size={16} />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
const Breadcrumb = ({ stock }) => {
  return (
    <motion.div
      {...fadeinup}
      className="flex items-center space-x-2 text-sm text-gray-400 my-4"
    >
      <a href="/" className="hover:text-blue-500">
        Home
      </a>
      <span>/</span>
      <a href="/dashboard" className="hover:text-blue-500">
        Dashboard
      </a>
      <span>/</span>
      <span className="hover:text-blue-500">{stock}</span>
    </motion.div>
  );
};
const generaterandomdata = (currentvalue, points) => {
  const data = [["Time", "Low", "Open", "Close", "High"]];
  for (let i = 0; i < points; i++) {
    const time = new Date(Date.now() - i * 5000).toLocaleTimeString();
    const open = currentvalue + Math.random() * 10 - 5;
    const close = open + Math.random() * 10 - 5;
    const low = Math.min(open, close) - Math.random() * 5;
    const high = Math.max(open, close) + Math.random() * 5;
    data.push([time, low, open, close, high]);
  }
  return data;
};
const Stockchart = ({ stock }) => {
  const [timerange, settimerange] = useState("5M");
  const [data, setdata] = useState(generaterandomdata(54512, 5));
  const [currentvalue, setcurentvalue] = useState(485451);
  const [change, setchange] = useState({ value: 0, percentage: 0 });
  //   console.log(data)

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generaterandomdata(
        currentvalue,
        getDataPoints(timerange)
      );
      setdata((prev) => [...prev, ...newData.slice(1)]);
      setcurentvalue(newData[newData.length - 1][3]);
      console.log(newData);
      const initalvalue = data[1][2];
      const changevalue = currentvalue - initalvalue;
      const changepercantage = (changevalue / initalvalue) * 100;
      setchange({ value: changevalue, percentage: changepercantage });
    }, 5000);

    return () => clearInterval(interval);
  }, [timerange, currentvalue, data]);
  const getDataPoints = (range) => {
    switch (range) {
      case "5M":
        return 5;
      case "10M":
        return 10;
      case "15M":
        return 15;
      case "30M":
        return 30;
      case "1H":
        return 60;
      default:
        return 5;
    }
  };

  const options = useMemo(
    () => ({
      backgroundColor: "transparent",
      chartArea: { width: "90%", height: "80%" },
      hAxis: {
        textStyle: { color: "#9CA3AF" },
        baselineColor: "#4B5563",
        gridlines: { color: "transparent" },
        format: "HH:mm",
      },
      vAxis: {
        textStyle: { color: "#9CA3AF" },
        baselineColor: "#4B5563",
        gridlines: { color: "#4B5563" },
      },
      legend: { position: "none" },
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: "#EF4444" },
        risingColor: { strokeWidth: 0, fill: "#10B981" },
      },
      animation: {
        startup: false,
        duration: 1000,
        easing: "out",
      },
    }),
    []
  );
  return (
    <motion.div
      {...fadeinup}
      className="bg-gray-800 p-6 rounded-lg shadow-lg my-6"
    >
      <div className="flex flex-cols md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{stock}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white">
              {currentvalue.toFixed(2)}
            </span>
            <motion.span
              className={`text-sm flex items-center ${
                change.value >= 0 ? "text-green-500" : "text-red-500"
              }`}
              key={change.value}
            >
              {change.value >= 0 ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              {change.value > 0 ? "+" : ""}
              {change.value.toFixed(2)}({change.percentage.toFixed(2)}%)
            </motion.span>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bgblue-600 transition-colors flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <PlusCircle className="inline-block mr-2" size={16} />
            Create Alert
          </motion.button>
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bgblue-600 transition-colors flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Eye className="inline-block mr-2" size={16} />
            Watchlist
          </motion.button>
        </div>
      </div>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
      <div className="flex justify-between mt-4">
        {["5M", "10M", "15M", "30M", "1H"].map((range) => (
          <motion.button
            key={range}
            onClick={() => settimerange(range)}
            className={`text-sm ${
              timerange === range ? "text-blue-500" : "text-gray-500"
            } hover:text-blue-500 transition-colors flex items-center `}
          >
            {" "}
            <Clock className="mr-1" size={14} />
            {range}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
const OptionTable = ({ stock }) => {
  const [option, setoption] = useState([
    {
      strike: 2500,
      callPrice: 105.3,
      callChange: 17.5,
      putPrice: 97.55,
      putChange: -15.55,
    },
    {
      strike: 25300,
      callPrice: 95.4,
      callChange: -10.9,
      putPrice: 96.65,
      putChange: 28.85,
    },
    {
      strike: 25200,
      callPrice: 78.5,
      callChange: 32.78,
      putPrice: 73.65,
      putChange: -12.25,
    },
    {
      strike: 25100,
      callPrice: 29.7,
      callChange: -10.14,
      putPrice: 28.3,
      putChange: 20.74,
    },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setoption((prev) =>
        prev.map((option) => ({
          ...option,
          callPrice: option.callPrice + (Math.random() - 0, 5) * 5,
          callChange: (Math.random() - 0.5) * 10,
          putPrice: option.putPrice + (Math.random() - 0, 5) * 5,
          putChange: (Math.random() - 0.5) * 10,
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      {...fadeinup}
      className="bg-gray-800 p-6 rounded-lg shadow-lg my-6"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        {" "}
        <DollarSign size={24} className="mr-2" />
        Top {stock} Options
      </h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b  border-gray-700">
            <th className="py-2">Strike</th>
            <th className="py-2">Call</th>
            <th className="py-2">Put</th>
          </tr>
        </thead>
        <tbody>
          {option.map((option, index) => (
            <motion.tr
              key={index}
              className="border-b border-gray-700"
              {...fadeinup}
            >
              <td className="py-2 text-white">{option.strike}</td>
              <td className="py-2">
                <div className="text-white">{option.callPrice.toFixed(2)}</div>
                <div
                  className={
                    option.callChange >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {option.callChange > 0 ? (
                    <ArrowUpRight size={16} className="inline mr-1" />
                  ) : (
                    <ArrowDownRight size={16} className="inline mr-1" />
                  )}{" "}
                  {option.callChange.toFixed(2)}
                </div>
              </td>
              <td className="py-2">
                <div className="text-white">{option.putPrice.toFixed(2)}</div>
                <div
                  className={
                    option.putChange >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {option.putChange > 0 ? (
                    <ArrowUpRight size={16} className="inline mr-1"/>
                  ) : (
                    <ArrowDownRight size={16} className="inline mr-1"/>
                  )}{" "}
                  {option.putChange.toFixed(2)}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
const page = () => {
  const { id } = useParams();
  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <Header />
      <main className="container mx-auto px-4">
        <Breadcrumb stock={id} />
        <Stockchart stock={id} />
        <OptionTable stock={id} />
      </main>
    </div>
  );
};

export default page;
