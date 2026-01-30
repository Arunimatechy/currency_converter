import React, { useEffect, useState } from "react"
import axios from "axios"

// Currency → Country code (for SVG flags)
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
}

// Flag SVG URL
const getFlagUrl = (currency) => {
  const code = currencyToCountry[currency]
  return code
    ? `https://flagcdn.com/w40/${code}.png`
    : "https://flagcdn.com/w40/un.png"
}

const App = () => {
  const [currencyList, setCurrencyList] = useState([])
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Fetch currency list
  const getCurrencies = async () => {
    try {
      const res = await axios.get("https://api.frankfurter.app/currencies")
      setCurrencyList(Object.keys(res.data))
    } catch {
      setError("Failed to load currencies")
    }
  }

  // Convert currency
  const convertCurrency = async (f = from, t = to, amt = amount) => {
    if (amt <= 0 || f === t) return

    try {
      setLoading(true)
      setError("")
      const res = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amt}&from=${f}&to=${t}`
      )
      setResult(res.data.rates[t].toFixed(2))
    } catch {
      setError("Conversion failed")
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  // Swap + auto convert
  const handleSwap = () => {
    setFrom(to)
    setTo(from)
    convertCurrency(to, from, amount)
  }

  // Initial load
  useEffect(() => {
    getCurrencies()

    const saved = JSON.parse(localStorage.getItem("lastConversion"))
    if (saved) {
      setAmount(saved.amount)
      setFrom(saved.from)
      setTo(saved.to)
      setResult(saved.result)
    }
  }, [])

  // 🚀 Auto convert on change (amount / from / to)
  useEffect(() => {
    convertCurrency()
  }, [amount, from, to])

  // Save last conversion
  useEffect(() => {
    if (result) {
      localStorage.setItem(
        "lastConversion",
        JSON.stringify({ amount, from, to, result })
      )
    }
  }, [result, amount, from, to])

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Currency Converter
        </h1>

        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter amount"
        />

        {/* From */}
        <div className="flex items-center gap-3 border p-3 rounded-lg">
          <img
            src={getFlagUrl(from)}
            alt={from}
            className="w-8 h-5 rounded-sm"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 outline-none"
          >
            {currencyList.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        {/* To */}
        <div className="flex items-center gap-3 border p-3 rounded-lg">
          <img
            src={getFlagUrl(to)}
            alt={to}
            className="w-8 h-5 rounded-sm"
          />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 outline-none"
          >
            {currencyList.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        {/* Swap */}
        <button
          onClick={handleSwap}
          className="w-full bg-gray-300 py-2 rounded-lg font-semibold"
        >
          🔁 Swap
        </button>

        {/* Result */}
        {loading && (
          <p className="text-center text-gray-500">Converting...</p>
        )}

        {result && !error && (
          <p className="text-center text-green-600 font-bold text-lg">
            {amount} {from} = {result} {to}
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default App
