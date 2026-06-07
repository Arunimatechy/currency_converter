import React, { useEffect, useState } from "react";
import axios from "axios";

const currencyToCountry = {
  USD: "us",
  INR: "in",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  AUD: "au",
  CAD: "ca",
  CHF: "ch",
  CNY: "cn",
  NZD: "nz",
};

const getFlagUrl = (currency) => {
  const code = currencyToCountry[currency];
  return code
    ? `https://flagcdn.com/w40/${code}.png`
    : "https://flagcdn.com/w40/un.png";
};

function App() {
  const [currencyList, setCurrencyList] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCurrencies = async () => {
    try {
      const res = await axios.get(
        "https://open.er-api.com/v6/latest/USD"
      );

      setCurrencyList(
        Object.keys(res.data.rates)
      );
    } catch {
      setError("Failed to load currencies");
    }
  };

  const convertCurrency = async (
    f = from,
    t = to,
    amt = amount
  ) => {
    if (!amt || amt <= 0) return;

    if (f === t) {
      setResult(amt);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `https://open.er-api.com/v6/latest/${f}`
      );

      const rate = res.data.rates[t];

      const converted = (
        amt * rate
      ).toFixed(2);

      setResult(converted);
    } catch {
      setError("Conversion Failed");
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    if (currencyList.length > 0) {
      convertCurrency();
    }
  }, [amount, from, to, currencyList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
          💱 Currency Converter
        </h1>

        {/* Amount Input */}
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) =>
            setAmount(Number(e.target.value))
          }
          placeholder="Enter Amount"
          className="w-full border border-gray-300 rounded-xl p-3 text-base outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* From Currency */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-xl p-3 mb-4">

          <img
            src={getFlagUrl(from)}
            alt={from}
            className="w-8 h-6 object-cover rounded"
          />

          <select
            value={from}
            onChange={(e) =>
              setFrom(e.target.value)
            }
            className="flex-1 outline-none bg-transparent text-sm sm:text-base"
          >
            {currencyList.map((cur) => (
              <option
                key={cur}
                value={cur}
              >
                {cur}
              </option>
            ))}
          </select>

        </div>

        {/* To Currency */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-xl p-3 mb-5">

          <img
            src={getFlagUrl(to)}
            alt={to}
            className="w-8 h-6 object-cover rounded"
          />

          <select
            value={to}
            onChange={(e) =>
              setTo(e.target.value)
            }
            className="flex-1 outline-none bg-transparent text-sm sm:text-base"
          >
            {currencyList.map((cur) => (
              <option
                key={cur}
                value={cur}
              >
                {cur}
              </option>
            ))}
          </select>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">

          <button
            onClick={handleSwap}
            className="w-full bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-black transition"
          >
            🔁 Swap
          </button>

          <button
            onClick={convertCurrency}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Convert
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Converting...
          </p>
        )}

        {/* Result */}
        {result &&
          !loading &&
          !error && (
            <div className="bg-green-100 p-4 rounded-xl text-center break-words">

              <p className="text-lg sm:text-xl font-bold text-green-700">

                {amount} {from}
                <br className="sm:hidden" />

                {" = "}
                {result} {to}

              </p>

            </div>
          )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 font-semibold">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

export default App;