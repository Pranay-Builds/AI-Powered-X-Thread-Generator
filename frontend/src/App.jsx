import React, { useState } from "react"

function App() {

  const [prompt, setPrompt] = useState("")
  const [thread, setThread] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch("http://localhost:5000/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      window.alert("Failed to generate thread")
      setLoading(false)
      return
    }

    const data = await response.json()
    setThread(data)
    setLoading(false)
  }

  return (
    <main className="bg-gray-900 w-full h-screen">
      <div className="flex items-center justify-center h-full flex-col text-white">
        <h1 className="text-3xl font-bold text-center">AI Powered X Threads Generator</h1>
        <p className="mt-3">Generate Viral Tweet Threads by writing a prompt below 🔥</p>
        <div className="w-96">
          <input type="text" className="p-2 mt-5 w-full rounded-lg border" placeholder="Write a prompt" onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <button className="mt-5 bg-blue-500 text-white p-2 hover:bg-blue-600 rounded-lg cursor-pointer" onClick={(e) => handleFormSubmit(e)}>Generate Thread</button>
        <div>
          {loading ? (
            <p className="mt-5">Loading...</p>
          ) : (
            <div className="mt-5 space-y-4 text-left max-w-xl">
              {thread
                ?.split("---") // Split into separate tweets using "---"
                ?.map((tweet, index) => (
                  <p key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    {tweet.trim()}
                  </p>
                ))}
            </div>

          )}
        </div>
      </div>
    </main>
  )
}

export default App
