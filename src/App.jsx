
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

s
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
      setResult(null)
      return
    }

    if (from === to) {
      setError('Please select different currencies')
      setResult(null)
      return
    }

    try {
      setLoading(true)
      setError('')
      const res = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      )
      setResult(res.data.rates[to].toFixed(2))
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.error}`)
      } else {
        setError('Network error. Please try again.')
      }
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    getCurrencies()
    
    const saved = JSON.parse(localStorage.getItem('lastConversion'))
    if (saved) {
      setAmount(saved.amount)
      setFrom(saved.from)
      setTo(saved.to)
      setResult(saved.result)
    }
  }, [])


  useEffect(() => {
    if (result) {
      localStorage.setItem(
        'lastConversion',
        JSON.stringify({ amount, from, to, result })
      )
    }
  }, [result])

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
          onClick={() => {
            const temp = from
            setFrom(to)
            setTo(temp)
          }}
          className="w-full bg-gray-300 text-black py-2 rounded-lg font-semibold"
        >
          Swap Currencies
        </button>

      
        <button
          onClick={convertCurrency}
          disabled={loading || amount <= 0 || from === to}
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
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}
      </div>
    </div>
  )
}

export default App

