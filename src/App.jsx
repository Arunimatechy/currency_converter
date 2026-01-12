


import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [currencyList, setCurrencyList] = useState([])
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getCurrencies = async () => {
    try {
      const res = await axios.get('https://api.frankfurter.app/currencies')
      setCurrencyList(Object.keys(res.data))
    } catch {
      setError('Failed to load currencies')
    }
  }

  const convertCurrency = async () => {
    if (amount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError('')
      const res = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      )
      setResult(res.data.rates[to].toFixed(2))
    } catch {
      setError('Conversion failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrencies()
  }, [])

  useEffect(() => {
    convertCurrency()
  }, [amount, from, to])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5">

        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Currency Converter
        </h1>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter amount"
        />

        <div className="flex gap-3">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 border p-3 rounded-lg"
          >
            {currencyList.map((curr) => (
              <option key={curr}>{curr}</option>
            ))}
          </select>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 border p-3 rounded-lg"
          >
            {currencyList.map((curr) => (
              <option key={curr}>{curr}</option>
            ))}
          </select>
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>

        {result && !error && (
          <p className="text-center text-green-600 font-bold">
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
