"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const initialAssets = [
  { symbol: "RELIANCE", price: 2500 },
  { symbol: "TCS", price: 3800 },
  { symbol: "HDFC", price: 1600 },
];

const fadeinup = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function PortfolioSimulator() {
  const [assets, setAssets] = useState(initialAssets);
  const [cash, setCash] = useState(100000);
  const [holdings, setHoldings] = useState<
    { symbol: string; quantity: number; avgBuyPrice: number }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((a) => ({
          ...a,
          price: Math.max(10, a.price + (Math.random() - 0.5) * 50),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const buyStock = (symbol: string) => {
    const asset = assets.find((a) => a.symbol === symbol);
    if (!asset || cash < asset.price) return;

    setCash((c) => c - asset.price);

    setHoldings((prev) => {
      const existing = prev.find((h) => h.symbol === symbol);

      if (existing) {
        const newQty = existing.quantity + 1;
        const newAvg =
          (existing.avgBuyPrice * existing.quantity + asset.price) / newQty;

        return prev.map((h) =>
          h.symbol === symbol
            ? { ...h, quantity: newQty, avgBuyPrice: newAvg }
            : h
        );
      }

      return [...prev, { symbol, quantity: 1, avgBuyPrice: asset.price }];
    });
  };

  const sellStock = (symbol: string) => {
    const asset = assets.find((a) => a.symbol === symbol);
    const holding = holdings.find((h) => h.symbol === symbol);
    if (!asset || !holding) return;

    setCash((c) => c + asset.price);

    if (holding.quantity === 1) {
      setHoldings((prev) => prev.filter((h) => h.symbol !== symbol));
    } else {
      setHoldings((prev) =>
        prev.map((h) =>
          h.symbol === symbol ? { ...h, quantity: h.quantity - 1 } : h
        )
      );
    }
  };

  const portfolioValue = useMemo(() => {
    const holdingsValue = holdings.reduce((sum, h) => {
      const price = assets.find((a) => a.symbol === h.symbol)?.price || 0;
      return sum + price * h.quantity;
    }, 0);

    return cash + holdingsValue;
  }, [assets, holdings, cash]);

  return (
    <motion.div
      {...fadeinup}
      className="bg-gray-800 p-6 rounded-xl shadow-lg my-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Portfolio Simulator
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">Cash</p>
          <p className="text-white font-semibold">₹{cash.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">Portfolio Value</p>
          <p className="text-green-400 font-semibold">
            ₹{portfolioValue.toFixed(2)}
          </p>
        </div>
      </div>

      <h3 className="text-lg text-white mb-2">Market</h3>
      <div className="space-y-2">
        {assets.map((a) => (
          <div
            key={a.symbol}
            className="flex justify-between items-center bg-gray-900 p-3 rounded"
          >
            <span className="text-white">{a.symbol}</span>
            <span className="text-gray-300">₹{a.price.toFixed(2)}</span>
            <div className="space-x-2">
              <button
                onClick={() => buyStock(a.symbol)}
                className="bg-green-500 text-black px-3 py-1 rounded"
              >
                Buy
              </button>
              <button
                onClick={() => sellStock(a.symbol)}
                className="bg-red-500 text-black px-3 py-1 rounded"
              >
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg text-white mt-6 mb-2">Holdings</h3>
      {holdings.length === 0 ? (
        <p className="text-gray-400">No holdings yet</p>
      ) : (
        holdings.map((h) => {
          const currentPrice =
            assets.find((a) => a.symbol === h.symbol)?.price || 0;
          const pnl = (currentPrice - h.avgBuyPrice) * h.quantity;

          return (
            <div key={h.symbol} className="bg-gray-900 p-3 rounded mb-2">
              <div className="flex justify-between">
                <span className="text-white">{h.symbol}</span>
                <span className={pnl >= 0 ? "text-green-400" : "text-red-400"}>
                  P/L: ₹{pnl.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Qty: {h.quantity} | Avg: ₹{h.avgBuyPrice.toFixed(2)}
              </p>
            </div>
          );
        })
      )}
    </motion.div>
  );
}
