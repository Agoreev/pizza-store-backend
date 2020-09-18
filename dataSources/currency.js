const fetch = require("node-fetch");

const getEURRate = async () => {
  const ratesApiUri = "https://api.exchangeratesapi.io/latest?base=USD";
  const USDRates = await fetch(ratesApiUri);
  const USDRatesJSON = await USDRates.json();
  return USDRatesJSON.rates.EUR;
};

module.exports = { getEURRate };
