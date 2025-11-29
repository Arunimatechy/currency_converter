






import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [currencylist, setCurrencylist] = useState([])
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [result, setresult] = useState('')

  const getcurrencies = async () => {
    const res = await axios.get("https://api.frankfurter.app/currencies")
    let currency = Object.keys(res.data)
    setCurrencylist(currency)
  }

  const Converter = async () => {
    const res = await axios.get(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    )
    setresult(res.data.rates[to])
  }

  useEffect(() => {
    getcurrencies()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-extrabold text-blue-700 mb-8">
        Currency Converter
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-5">

        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder='Enter the amount'
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-4">
          <label className="font-semibold w-16">FROM</label>
          <select
            onChange={(e) => setFrom(e.target.value)}
            value={from}
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencylist.map((curr) => (
              <option key={curr}>{curr}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-semibold w-16">TO</label>
          <select
            onChange={(e) => setTo(e.target.value)}
            value={to}
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencylist.map((curr) => (
              <option key={curr}>{curr}</option>
            ))}
          </select>
        </div>

        <button
          onClick={Converter}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105"
        >
          Convert
        </button>

        {result && (
          <div className="mt-4 text-center text-lg font-bold text-green-600">
            {`Converted Amount: ${amount} ${from} = ${result} ${to}`}
          </div>
        )}

      </div>
    </div>
  )
}

export default App











// import React, { useEffect ,useState} from 'react'
// import axios from 'axios'

// const App = () => {
//   const[currencylist,setCurrencylist]=useState([])
//   const[amount,setAmount]=useState(1)
//   const[from,setFrom]=useState('USD')
//   const[to,setTo]=useState('INR')
//   const[result,setresult]=useState('')

//   const getcurrencies= async()=>{
//     const res= await axios.get("https://api.frankfurter.app/currencies")
//     let currency=Object.keys(res.data)
//     setCurrencylist(currency)
//   }

//   const Converter=async()=>{
//     const res=await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
//     setresult(res.data.rates[to])
//   }

//   useEffect(()=>{
//     getcurrencies()
//   },[])

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">

//       <h1 className="text-3xl font-bold text-blue-600 mb-6">CURRENCY CONVERTER</h1>

//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">

//         <input
//           onChange={(e) => setAmount(e.target.value)}
//           type="number"
//           placeholder='Enter the amount'
//           className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <div className="flex items-center gap-4">
//           <h2 className="font-semibold">FROM</h2>
//           <select
//             onChange={(e)=>setFrom(e.target.value)}
//             value={from}
//             className="border p-2 rounded flex-1"
//           >
//             {currencylist.map((curr)=>{
//               return <option key={curr}>{curr}</option>
//             })}
//           </select>
//         </div>

//         <div className="flex items-center gap-4">
//           <h2 className="font-semibold">TO</h2>
//           <select
//             onChange={(e)=>setTo(e.target.value)}
//             value={to}
//             className="border p-2 rounded flex-1"
//           >
//             {currencylist.map((curr)=>{
//               return <option key={curr}>{curr}</option>
//             })}
//           </select>
//         </div>

//         <button
//           onClick={Converter}
//           className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Convert
//         </button>

//         <div className="mt-4 text-center font-bold text-green-600">
//           {result && `Converted Amount: ${amount} ${from} = ${result} ${to}`}
//         </div>

//       </div>
//     </div>
//   )
// }

// export default App





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [questions, setQuestions] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [options, setOptions] = useState([]);
//   const [score, setScore] = useState(0);
//   const [selected, setSelected] = useState("");
//   const [finished, setFinished] = useState(false);
//   const [answers, setAnswers] = useState([]); // store user answers

//   // Fetch quiz questions
//   const getQuiz = async () => {
//     const res = await axios.get(
//       "https://opentdb.com/api.php?amount=10&type=multiple"
//     );

//     let allQuestions = res.data.results;
//     setQuestions(allQuestions);
//     createOptions(allQuestions[0]);
//   };

//   // Combine correct + incorrect answers and shuffle
//   const createOptions = (q) => {
//     let opts = [...q.incorrect_answers, q.correct_answer];
//     opts.sort(() => Math.random() - 0.5);
//     setOptions(opts);
//   };

//   // Next question
//   const nextQuestion = () => {
//     if (selected === "") return;

//     // store answer
//     const updatedAnswers = [...answers];
//     updatedAnswers[index] = selected;
//     setAnswers(updatedAnswers);

//     // Score update
//     if (selected === questions[index].correct_answer) {
//       setScore(score + 1);
//     }

//     setSelected("");

//     if (index === questions.length - 1) {
//       setFinished(true);
//       return;
//     }

//     let next = index + 1;
//     setIndex(next);
//     createOptions(questions[next]);

//     // If user already answered before, auto select it
//     if (updatedAnswers[next]) {
//       setSelected(updatedAnswers[next]);
//     }
//   };

//   // Previous question
//   const prevQuestion = () => {
//     if (index === 0) return;

//     // Remove score if previous answer was correct
//     if (answers[index] === questions[index].correct_answer) {
//       setScore(score - 1);
//     }

//     let prev = index - 1;
//     setIndex(prev);
//     createOptions(questions[prev]);

//     // Re-select previous saved answer
//     setSelected(answers[prev] || "");
//   };

//   useEffect(() => {
//     getQuiz();
//   }, []);

//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl">
//         Loading Quiz...
//       </div>
//     );
//   }

//   if (finished) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//         <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
//           <h1 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</h1>
//           <h2 className="text-2xl font-semibold mb-6">Your Score: {score} / 10</h2>

//           <button
//             onClick={() => window.location.reload()}
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
//           >
//             Restart Quiz
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold text-blue-600 mb-6 tracking-wide">
//         QUIZ APP
//       </h1>

//       <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4">

//         {/* QUESTION */}
//         <h2
//           className="font-semibold text-lg leading-relaxed text-gray-800"
//           dangerouslySetInnerHTML={{
//             __html: `Q${index + 1}. ${questions[index].question}`,
//           }}
//         />

//         {/* OPTIONS */}
//         <div className="flex flex-col gap-3">
//           {options.map((opt, i) => (
//             <button
//               key={i}
//               onClick={() => setSelected(opt)}
//               className={`border p-3 rounded-lg text-left shadow-sm transition
//                 ${
//                   selected === opt
//                     ? "bg-blue-200 border-blue-600"
//                     : "bg-gray-100 hover:bg-gray-200"
//                 }
//               `}
//               dangerouslySetInnerHTML={{ __html: opt }}
//             />
//           ))}
//         </div>

//         {/* BUTTONS */}
//         <div className="flex justify-between mt-4">
//           <button
//             onClick={prevQuestion}
//             disabled={index === 0}
//             className={`py-2 px-4 rounded-lg shadow transition transform hover:scale-105
//               ${
//                 index === 0
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-600 text-white hover:bg-gray-700"
//               }
//             `}
//           >
//             ⬅ Previous
//           </button>

//           <button
//             onClick={nextQuestion}
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
//           >
//             Next ➜
//           </button>
//         </div>

//         {/* SCORE */}
//         <div className="text-center font-bold text-green-600 mt-2">
//           Score: {score}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default App;

