'use client'
import { useState } from "react";
import axios from "axios";

function Home() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const GetResponse = async () => {
    if (!text) {
      setError('Please ask some question');
      return;
    }
    try {
      const options = {
        method: "POST",
        data: {
          history: chatHistory,
          message: text
        },
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await axios.post("/api/gemini", options.data, {
        headers: options.headers
      });
      const data = response.data.text;
      console.log(data);
      setChatHistory(oldHistory => [...oldHistory, {
        role: 'user',
        parts: [{ text: text }]
      }, {
        role: 'model',
        parts: [{ text: data }]
      }]);
      setText('');
    } catch (error) {
      console.log(error);
      setError('Something went wrong');
    }
  };

  const surpriseOptions = [
    "Ultimate animal combination, which two?",
    "Time travel advice, future tips?",
    "True conspiracy theories, lesser-known?",
    "Telepathic communication, world changes?",
    "Live in any fictional universe?",
    "Humans breathe underwater, what happens?",
    "Mind-blowing discoveries, last decade?",
    "Aliens take one book, which?",
    "No money, everything free, society?",
    "Surprising facts about human brain?",
    "Meet historical figure, ask what?",
    "Bizarre, unexplained historical phenomena?",
    "Instantly learn any skill, which?",
    "Utopian society, how would function?",
    "Interstellar travel, colonize other planets?"
  ];

  const HandleSurprise = () => {
    const result = parseInt(Math.random() * surpriseOptions.length);
    const surpriseText = surpriseOptions[result];
    setText(surpriseText);
  };

  const clear = () => {
    setText('');
    setError('');
    setChatHistory([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <h1 className="text-3xl font-bold mb-4">What do you want to know?</h1>
        <div className="flex items-center w-full mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your question..."
            className="flex-1 mr-4 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {!error && (
            <button
              onClick={GetResponse}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Ask me
            </button>
          )}
          {!error && (
            <button
              onClick={clear}
              className="py-2 px-4 bg-red-500 text-white rounded-md ml-4 hover:bg-red-600 focus:outline-none"
            >
              Clear
            </button>
          )}
          <button
            disabled={chatHistory.length === 0}
            onClick={HandleSurprise}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md ml-4 hover:bg-gray-400 focus:outline-none"
          >
            Surprise Me
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {chatHistory.map((chat, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4 w-full max-w-md">
            <p className="font-semibold mb-2">{chat.role}:</p>
            <p className="text-gray-700">{chat.parts[0].text}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
