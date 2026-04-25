import React, { useEffect, useState } from "react"
import axios from "axios"

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
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Load currencies
  const getCurrencies = async () => {
    try {
      const res = await axios.get("https://open.er-api.com/v6/latest/USD")
      setCurrencyList(Object.keys(res.data.rates))
    } catch (err) {
      setError("Failed to load currencies")
    }
  }

  // Convert
  const convertCurrency = async (
    f = from,
    t = to,
    amt = amount
  ) => {
    if (!amt || amt <= 0) return

    if (f === t) {
      setResult(amt)
      return
    }

    try {
      setLoading(true)
      setError("")

      const res = await axios.get(
        `https://open.er-api.com/v6/latest/${f}`
      )

      const rate = res.data.rates[t]
      const converted = (amt * rate).toFixed(2)

      setResult(converted)
    } catch (err) {
      setError("Conversion Failed")
      setResult("")
    } finally {
      setLoading(false)
    }
  }

  // Swap
  const handleSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  useEffect(() => {
    getCurrencies()
  }, [])

  useEffect(() => {
    if (currencyList.length > 0) {
      convertCurrency()
    }
  }, [amount, from, to, currencyList])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center p-5">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          💱 Currency Converter
        </h1>

        {/* Amount */}
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) =>
            setAmount(Number(e.target.value))
          }
          className="w-full border p-3 rounded-xl mb-4"
          placeholder="Enter Amount"
        />

        {/* From */}
        <div className="flex items-center gap-3 border p-3 rounded-xl mb-4">
          <img
            src={getFlagUrl(from)}
            alt={from}
            className="w-8 h-5"
          />

          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 outline-none"
          >
            {currencyList.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {/* To */}
        <div className="flex items-center gap-3 border p-3 rounded-xl mb-4">
          <img
            src={getFlagUrl(to)}
            alt={to}
            className="w-8 h-5"
          />

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 outline-none"
          >
            {currencyList.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={handleSwap}
            className="w-1/2 bg-gray-700 text-white py-3 rounded-xl hover:bg-black"
          >
            🔁 Swap
          </button>

          <button
            onClick={convertCurrency}
            className="w-1/2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
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
        {result && !loading && !error && (
          <div className="bg-green-100 p-4 rounded-xl text-center">
            <p className="text-xl font-bold text-green-700">
              {amount} {from} = {result} {to}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 font-bold">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default App
