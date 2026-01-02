"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ActivityIcon,
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  Bell,
  BookOpen,
  ChevronRight,
  DollarSign,
  Gift,
  Globe,
  HelpCircle,
  Menu,
  PieChart,
  Plus,
  Search,
  Settings,
  ShoppingCartIcon,
  TrendingUp,
  User,
  X,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import MultiAssetOverlayChart from "@/components//ui/MultiAssetOverlayChart";
import PortfolioSimulator from "@/components/ui/PortfolioSimulator";

const fadeinup = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Header = () => {
  const [ismenuopen, setismenuopen] = useState(false);
  const [notification] = useState(3);
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

const Tabsection = () => {
  const [activeTab, setactivetab] = useState("Stocks");
  return (
    <div className="border-b border-gray-700">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8">
          {["Stocks", "Mutual funds", "ETFs", "Options"].map((tab) => (
            <motion.li
              className={`py-1 cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-300 hover:text-blue-500 transition-colors"
              }`}
              key={tab}
              onClick={() => setactivetab(tab)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const generaterandomvalues = (value: number) => {
  const change = (Math.random() * 2 - 1) * 100;
  const percentagechange = (change / value) * 100;
  return { change, percentagechange };
};

const Marketindices = () => {
  const router = useRouter();
  const [marketdata, setmarketdata] = useState([
    { name: "NIFTY50", values: 18256.85, change: 0, percentagechange: 0 },
    { name: "BANKNIFTY", values: 50256.85, change: 0, percentagechange: 0 },
    { name: "SENSEX", values: 30256.8, change: 0, percentagechange: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setmarketdata((prevdata) =>
        prevdata.map((index) => {
          const { change, percentagechange } = generaterandomvalues(
            index.values
          );
          const newvalue = index.values + change;
          return { ...index, values: newvalue, change, percentagechange };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {marketdata.map((index) => (
        <motion.div
          key={index.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => router.push(`/dashboard/${index.name}`)}
        >
          <h3 className="font-semibold text-gray-300">{index.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-lg text-white">
              {index.values.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <motion.span
              key={index.change}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm flex items-center ${
                index.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {index.change >= 0 ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              {index.change.toFixed(2)} ({index.percentagechange.toFixed(2)}% )
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const StockCard = ({
  name,
  initalPrice,
}: {
  name: String;
  initalPrice: number;
}) => {
  const [price, setprice] = useState(initalPrice);
  const [change, setchange] = useState(0);
  const [percentchange, setpercentchange] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const { change: randomChange, percentagechange: randomPercentChange } =
        generaterandomvalues(price);
      setprice((precprice) => precprice + randomChange);
      setchange(randomChange);
      setpercentchange(randomPercentChange);
    }, 1000);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-800 p-4 rounded-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => router.push(`/dashboard/${name}`)}
    >
      <h3 className="font-semibold text-white mb-2c">{name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-lg text-white">
          {price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </span>
        <motion.span
          key={change}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`text-sm flex items-center ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}{" "}
          {change.toFixed(2)} ({percentchange.toFixed(2)}% )
        </motion.span>
      </div>
    </motion.div>
  );
};

const MostBought = () => (
  <div className="my-8">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        Most Bought on TradePro
      </h2>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-blue-500 text-sm hover:underline flex items-center"
        href="#"
      >
        View All
        <ChevronRight className="ml-1" size={16} />
      </motion.a>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StockCard name="Reliance" initalPrice={2346.4} />
      <StockCard name="Tata Motors" initalPrice={32346.4} />
      <StockCard name="Energy" initalPrice={246.4} />
      <StockCard name="Zomato" initalPrice={9346.4} />
    </div>
  </div>
);

const Productandtools = () => {
  const products = [
    { name: "F&O", icon: BarChart2 },
    { name: "IPO", icon: DollarSign },
    { name: "ETFs", icon: PieChart },
    { name: "FDs", icon: TrendingUp },
    { name: "US stock", icon: ActivityIcon },
  ];

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-white mb-2">
        Products & Tools
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.name}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: "#2D3748" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="bg-blue-500 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <product.icon className="text-white" />
            </motion.div>
            <span className="text-gray-300"> {product.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Topgainers = () => (
  <div className="my-8">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        Most Bought on TradePro
      </h2>
      <motion.a
        href="#"
        className="text-blue-500 text-sm hover:underline flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View All
        <ChevronRight className="ml-1" size={16} />
      </motion.a>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StockCard name="Trent" initalPrice={146.4} />
      <StockCard name="HDFC" initalPrice={275.4} />
      <StockCard name="ICICI" initalPrice={395.4} />
      <StockCard name="Airtel" initalPrice={85.4} />
    </div>
  </div>
);

const TopByMarketCap = () => {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const companies = [
    { name: "Reliance Industries", marketCap: 1523456.78 },
    { name: "TCS", marketCap: 1234567.89 },
    { name: "HDFC Bank", marketCap: 987654.32 },
    { name: "Infosys", marketCap: 7632.1 },
    { name: "ICICI Bank", marketCap: 5410.98 },
  ];

  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold text-white mb-4">
        Top by Market Cap
      </h2>
      <div className="space-y-4">
        {companies.map((company) => (
          <motion.div
            key={company.name}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() =>
              setExpandedCompany(
                expandedCompany === company.name ? null : company.name
              )
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-white">{company.name}</span>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  ₹{company.marketCap.toFixed(2)} Cr
                </span>
                <motion.div
                  animate={{
                    rotate: expandedCompany === company.name ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus className="text-blue-500" />
                </motion.div>
              </div>
            </div>
            <AnimatePresence>
              {expandedCompany === company.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-gray-300"
                >
                  <p>Additional information about {company.name} goes here.</p>
                  <p>
                    You can add more details, charts, or any other relevant
                    data.
                  </p>
                  <motion.button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <Header />
      <motion.main {...fadeinup} className="container mx-auto px-4">
        <Tabsection />
        <Marketindices />
        <MultiAssetOverlayChart />
        <PortfolioSimulator />
        <MostBought />
        <Productandtools />
        <Topgainers />
        <TopByMarketCap />
      </motion.main>
    </div>
  );
};

export default page;
