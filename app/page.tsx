"use client";

import {
  ArrowRight,
  BarChart2,
  Bell,
  Book,
  Globe,
  Menu,
  PieChart,
  Shield,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/page";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Animatedsection = ({ children }: any) => {
  const ref = useRef(null);
  const isinview = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isinview ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
};

const FeatureBox = ({ icon, title, description }: any) => {
  const [ishovered, setishovered] = useState(false);
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 40px rgba(59,130,246,0.3)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setishovered(true)}
      onHoverEnd={() => setishovered(false)}
      className="bg-gray-800 p-6 rounded-xl shadow-1g flex flex-col items-center text-center h-full relative overflow-hidden"
    >
      <motion.div
        animate={{ scale: ishovered ? 1.2 : 1, rotate: ishovered ? 360 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-blue-500 mb-4 relative z-10"
      >
        {icon}
      </motion.div>
      <h3 className="text-x1 font-semibold mb-2 text-white relative z-10">
        {title}
      </h3>
      <p className="text-gray-300 mb-4 flex-grow relative z-10">
        {description}
      </p>
      <motion.button
        whileHover={{
          x: 5,
        }}
        className="mt-auto text-blue-500 flex items-center text-sm font-medium relative z-10"
      >
        Learn More <ArrowRight className="m1-1" size={16} />
      </motion.button>
      <motion.div
        className="absolute inset-0 bg-blue-600 opacity-0"
        animate={{ opacity: ishovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default function Home() {
  const router = useRouter();
  const containeref = useRef(null);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const logout = async () => {
    await signOut(auth);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const tradingFeatures = [
    {
      icon: <Globe size={32} />,
      title: "Global Markets",
      description:
        "Access a wide range of international markets and trade various assets from a single platform.",
    },
    {
      icon: <Zap size={32} />,
      title: "Real-time Data",
      description:
        "Stay informed with lightning-fast, real-time market data and instant trade execution.",
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Trading",
      description:
        "Trade with confidence using our advanced encryption and multi-factor authentication systems.",
    },
    {
      icon: <PieChart size={32} />,
      title: "Portfolio Analysis",
      description:
        "Gain insights into your portfolio performance with comprehensive analysis tools and reports.",
    },
    {
      icon: <Bell size={32} />,
      title: "Price Alerts",
      description:
        "Never miss a trading opportunity with customizable price alerts and notifications.",
    },
    {
      icon: <Book size={32} />,
      title: "Trading Education",
      description:
        "Enhance your trading skills with our extensive library of educational resources and webinars.",
    },
  ];

  const [ismenuopen, setismenuopen] = useState(false);
  return (
    <div
      ref={containeref}
      className="bg-gray-900 min-h-screen font-sans text-white"
    >
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => router.push("/")}
          className="text-3xl font-bold text-blue-500"
        >
          TradePro
        </motion.div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {["Markets", "Trading", "Analysis", "Learn"].map((item, index) => (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={index}
              >
                <span className="text-gray-300 hover:text-blue-500 transition-colors">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors transform hover:scale-105"
            onClick={() => router.push("/dashboard")}
          >
            Start Trading
          </motion.button>

          {!user && (
            <motion.button
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors transform hover:scale-105"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </motion.button>
          )}

          {user && (
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-md border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <span className="text-lg">👤</span>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 4 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-64 rounded-xl bg-gray-800 border border-gray-700 shadow-xl overflow-hidden z-20"
                  >
                    <div className="px-4 py-3 border-gray-700 bg-gray-850/50">
                      <p className="text-sm text-gray-400">Signed in as :</p>
                      <p className="text-sm font-semibold truncate">
                        {user.email || "User"}
                      </p>
                    </div>

                    <div className="px-4 py-3 space-y-1 text-left"></div>

                    <button
                      onClick={logout}
                      className="w-full text-left font-bold px-4 py-3 text-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-white"
          onClick={() => setismenuopen(!ismenuopen)}
        >
          {ismenuopen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </header>
      {ismenuopen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.6 }}
          className="md:hidden bg-gray-800 px-4 py-2"
        >
          <ul className="space-y-3">
            {["Markets", "Trading", "Analysis", "Learn"].map((item, index) => (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={index}
              >
                <span className="block text-gray-300 hover:text-blue-500 transition-colors py-2">
                  {item}
                </span>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                className="w-full bg-blue-600 text-white mb-3 px-6 py-2 rounded hover:bg-blue-700 transition-colors transform hover:scale-105"
                onClick={() => router.push("/dashboard")}
              >
                Start Trading
              </button>
              {!user && (
                <button
                  className="w-full bg-blue-600 text-white mb-1 px-6 py-2 rounded hover:bg-blue-700 transition-colors transform hover:scale-105"
                  onClick={() => router.push("/auth")}
                >
                  Sign In
                </button>
              )}
              {user && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-md border border-gray-700 hover:border-blue-500 transition-colors"
                  >
                    <span className="text-lg">👤</span>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 4 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-0 mt-3 w-64 rounded-xl bg-gray-800 border border-gray-700 shadow-xl overflow-hidden z-20"
                      >
                        <div className="px-4 py-3 border-gray-700 bg-gray-850/50">
                          <p className="text-sm text-gray-400">
                            Signed in as :
                          </p>
                          <p className="text-sm font-semibold truncate">
                            {user.email || "User"}
                          </p>
                        </div>

                        <div className="px-4 py-3 space-y-1 text-left"></div>

                        <button
                          onClick={logout}
                          className="w-full text-left font-bold px-4 py-3 text-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.li>
          </ul>
        </motion.div>
      )}

      <main className="container mx-auto px-4">
        <Animatedsection>
          <div className="text-center py-28 ">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold mb-6"
            >
              Trade Smarter, Not Harder
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-gray-400 mb-12"
            >
              Access global markets with real-time data and advanced traning
              tool
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>router.push("/auth")}
              className="bg-blue-600 text-white px-8 py-4 rounded-md text-xl hover:bg-blue-700 transition-colors flex items-center mx-auto"
            >
              Open Free Account <ArrowRight className="ml-2" />
            </motion.button>
          </div>
        </Animatedsection>

        <Animatedsection>
          <div className="py-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">
                  Advanced Trading Tools
                </h2>
                <ul className="space-y-6">
                  {[
                    "Real-time market data",
                    "Advanced charting",
                    "Risk management tools",
                  ].map((item, index) => (
                    <motion.li
                      whileHover={{ scale: 1.05, color: "#3B82f6" }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      key={index}
                      className="flex items-center text-gray-300 text-xl"
                    >
                      <BarChart2 className="mr-4 text-blue-500" size={28} />{" "}
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-800 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition transform-duration-300 relative overflow-hidden group"
              >
                <img
                  className="w-full rounded-xl"
                  src="https://i.ibb.co/C1jWyk9/1.jpg"
                  alt="Trading platform screenshot"
                />
                <motion.div
                  whileHover={{ opacity: 0.2 }}
                  className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
              </motion.div>
            </div>
          </div>
        </Animatedsection>

        <Animatedsection>
          <div className="py-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition transform-duration-300 relative overflow-hidden group">
                <img
                  className="w-full rounded-xl"
                  src="https://i.ibb.co/0K3ZTzt/2.jpg"
                  alt="Market analysis feature"
                />
                <motion.div
                  whileHover={{ opacity: 0.2 }}
                  className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-8">
                  Market Analysis at your Fingertips
                </h2>
                <p className="text-gray-300 text-xl mb-8">
                  Get in-depth market analysis and informed trading decisions.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center bg-gray-800 p-6 rounded-xl relative overflow-hidden group"
                >
                  <TrendingUp
                    className="text-blue-500 mr-6 relative z-10"
                    size={48}
                  />
                  <div className="relative z-10">
                    <div className="text-blue-500 text-5xl font-bold">+500</div>
                    <p className="text-gray-300 text-xl">
                      Global market available for trading
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ opacity: 0.2 }}
                    className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Animatedsection>

        <Animatedsection>
          <div ref={containeref} className="bg-gray-900 py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  Why choose Tradepro?
                </h2>
                <p className="text-xl text-gray-300">
                  Experience the advantage of professional grade trading tools
                  and resources
                </p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-8">
                {tradingFeatures.map((features, index) => (
                  <FeatureBox
                    key={index}
                    icon={features.icon}
                    title={features.title}
                    description={features.description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </div>
        </Animatedsection>

        <Animatedsection>
          <div className="bg-blue-600 rounded-2xl p-12 text-center py-12 relative overflow-hidden group">
            <motion.div
              whileHover={{ opacity: 0.2 }}
              className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <h2 className="text-4xl font-bold mb-6 relative z-10">
              Ready to start Trading
            </h2>
            <p className="text-xl mb-8 relative z-10">
              Join thousands of traders and start your journey to financial
              success.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>router.push("/auth")}
              className="bg-white text-blue-600 px-8 py-4 rounded-md text-xl font-bold hover:bg-gray-200 transition-colors relative z-10"
            >
              Create Free Account
            </motion.button>
          </div>
        </Animatedsection>
      </main>
    </div>
  );
}
