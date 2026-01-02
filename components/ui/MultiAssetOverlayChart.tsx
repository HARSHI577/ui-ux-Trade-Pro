"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const fadeinup = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const generateData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `T${i + 1}`,
    Stock: 150 + Math.random() * 20,
    Bond: 80 + Math.random() * 5,
    Crypto: 300 + Math.random() * 50,
  }));
};

export default function MultiAssetOverlayChart() {
  const data = generateData();

  return (
    <motion.div
      {...fadeinup}
      className="bg-gray-800 p-6 rounded-lg shadow-lg my-6"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        Multi-Asset Comparison
      </h3>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3  3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="Stock"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Bond"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Crypto"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
