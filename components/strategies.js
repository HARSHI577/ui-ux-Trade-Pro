export const applyMAStrategy = (prices, sma) => {
  let position = "NONE"; // NONE | LONG

  return prices.map((price, i) => {
    if (i === 0 || !sma[i] || !sma[i - 1]) return null;

    if (position === "NONE" && prices[i - 1] < sma[i - 1] && price > sma[i]) {
      position = "LONG";
      return "BUY";
    }

    if (position === "LONG" && prices[i - 1] > sma[i - 1] && price < sma[i]) {
      position = "NONE";
      return "SELL";
    }

    return null;
  });
};
