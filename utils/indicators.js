export const calculateSMA = (prices, period) => {
  return prices.map((_, index) => {
    if (index < period - 1) return null;

    const slice = prices.slice(index - period + 1, index + 1);
    const sum = slice.reduce((a, b) => a + b, 0);
    return sum / period;
  });
};

export const calculateBollingerBands = (
  prices,
  period = 20,
  multiplier = 2
) => {
  const sma = calculateSMA(prices, period);

  return prices.map((_, i) => {
    if (i < period - 1) return null;

    const slice = prices.slice(i - period + 1, i + 1);
    const mean = sma[i];

    const variance =
      slice.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / period;

    const stdDev = Math.sqrt(variance);

    return {
      upper: mean + multiplier * stdDev,
      middle: mean,
      lower: mean - multiplier * stdDev,
    };
  });
};

export const calculateVolatility = (prices, period = 20) => {
  if (prices.length < period + 1) return null;

  const returns = [];
  for (let i = prices.length - period; i < prices.length; i++) {
    const r = Math.log(prices[i] / prices[i - 1]);
    returns.push(r);
  }

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;

  const variance =
    returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;

  return Math.sqrt(variance);
};

export const calculateRSI = (prices, period = 14) => {
  if (prices.length < period + 1) return null;

  let gains = 0;
  let losses = 0;

  for (let i = prices.length - period; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
};
