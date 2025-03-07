import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [thread, setThread] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        window.alert("Failed to generate thread");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setThread(data); 
    } catch (error) {
      console.error("Error fetching thread:", error);
    }

    setLoading(false);
  };

  const handleTweetCopy = (id) => {
    const tweet = document.getElementById(id).innerText;
    navigator.clipboard.writeText(tweet);
  };

  return (
    <main className="bg-gray-900 w-full h-screen flex items-center justify-center overflow-y-auto p-5">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center">
          AI Powered X Threads Generator
        </h1>
        <p className="mt-3 text-center">
          Generate Viral Tweet Threads by writing a prompt below 🔥
        </p>
        <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
          <div className="w-full">
            <input
              type="text"
              className="p-2 w-full rounded-lg border border-gray-700 bg-gray-900 text-white"
              placeholder="Write a prompt..."
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 hover:bg-blue-600 rounded-lg"
          >
            {loading ? "Generating..." : "Generate Thread"}
          </button>
        </form>
        <div className="mt-5 space-y-4">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            thread &&
            thread.split("---").map((tweet, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg text-sm">
                <p id={index}>{tweet.trim()}</p>
                <button
                  onClick={() => handleTweetCopy(index)}
                  className="mt-2 bg-blue-500 text-white p-2 w-full hover:bg-blue-600 rounded-lg"
                >
                  Copy to Clipboard
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
