# 💱 Currency Converter App

A modern and responsive **Currency Converter web application** built using **React.js**.  
This app allows users to convert currencies in real time using live exchange rate APIs with a clean and simple UI.

---

## 🚀 Live Demo

```text
 https://currency-converter-chi-ashen.vercel.app/
```

---

## 📌 Project Overview

Currency Converter is a frontend project designed to convert one currency into another using real-time exchange rates.

This project helps in understanding:

- API integration in React
- State management using Hooks
- Handling user input dynamically
- Working with asynchronous data (fetch/axios)
- Building responsive UI components

---

## ✨ Features

### 💱 Currency Conversion
- Convert any currency to another
- Real-time exchange rates
- Instant calculation results

### 🌍 Multi-Currency Support
- Supports major world currencies
- Dropdown selection for currencies
- Easy switching between currencies

### ⚡ Real-Time API Integration
- Fetches live exchange rates
- Accurate conversion results
- API-based dynamic updates

### 📱 Responsive Design
- Mobile-friendly UI
- Clean and simple layout
- Fast and lightweight

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- CSS3 / Tailwind CSS (if used)

### API
- Exchange Rate API / Currency API

### Tools
- Git
- GitHub
- VS Code
- Vercel / Netlify

---

## 🏗️ Architecture

```text
User Input (Amount + Currency)
            │
            ▼
React Component
            │
            ▼
API Request (Exchange Rates)
            │
            ▼
Response Data Processing
            │
            ▼
Converted Value Display
```

---

## 📂 Project Structure

```bash
currency_converter/

src/
│
├── components/
│   ├── Converter.jsx
│   ├── CurrencyInput.jsx
│   └── Header.jsx
│
├── services/
│   └── currencyAPI.js
│
├── App.js
├── index.js
└── styles.css
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/Arunimatechy/currency_converter.git
cd currency_converter
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run Application

```bash
npm start
```

or

```bash
npm run dev
```

App runs at:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file:

```env
REACT_APP_API_KEY=your_api_key_here
REACT_APP_BASE_URL=https://api.exchangerate-api.com
```

---

## 🎯 Learning Outcomes

This project helped me learn:

- React Hooks (useState, useEffect)
- API integration using Axios/fetch
- Handling async operations
- Form handling in React
- Component-based architecture
- UI responsiveness
- Error handling in API calls

---

## 📸 Screenshots

### Home Page
_Add screenshot here_

### Currency Conversion
_Add screenshot here_

### Mobile View
_Add screenshot here_

---

## 🚀 Future Improvements

- Currency swap button (↔)
- Historical exchange rate charts
- Dark mode support
- Favorite currencies
- Offline caching
- Voice input support

---

## 👨‍💻 Developer

### Arunima

Full Stack Developer passionate about building scalable and interactive web applications.

### Skills Used

- React.js
- JavaScript
- REST APIs
- CSS
- Git & GitHub

GitHub:
https://github.com/Arunimatechy

---

## 🌟 Why I Built This Project

I built this project to improve my understanding of API integration and React state management. It helped me practice real-world frontend development skills like handling asynchronous data and building responsive user interfaces.

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
