"use client";

interface AnalyticsPanelProps {
  showMA: boolean;
  showRSI: boolean;
  showVolatility: boolean;
  smaValue: number | null;
  rsiValue: number | null;
  volatilityValue: number | null;
}

export default function AnalyticsPanel({
  showMA,
  showRSI,
  showVolatility,
  smaValue,
  rsiValue,
  volatilityValue,
}: AnalyticsPanelProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {showMA && (
        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">SMA</p>
          <p className="text-white text-lg font-semibold">
            {smaValue?.toFixed(2) ?? "--"}
          </p>
        </div>
      )}

      {showRSI && (
        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">RSI</p>
          <p
            className={`text-lg font-semibold ${
              rsiValue !== null && rsiValue > 70
                ? "text-red-400"
                : rsiValue !== null && rsiValue < 30
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {rsiValue?.toFixed(2) ?? "--"}
          </p>
        </div>
      )}

      {showVolatility && (
        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">Volatility</p>
          <p className="text-white text-lg font-semibold">
            {volatilityValue?.toFixed(4) ?? "--"}
          </p>
        </div>
      )}
    </div>
  );
}
