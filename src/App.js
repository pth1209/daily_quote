import './App.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"

function App() {

  const[quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")

  const getQuote = () => {
    axios
      .get("https://api.quotable.io/random")
      .then(response => {
        console.log(response.data)
        setQuote(response.data.content)
        setAuthor(response.data.author)
      })
      .catch((error) => {
        console.log(error)
      })
    }

  useEffect(() => {
    getQuote()
  }, [])

  return (
    <div className="App">
      <div className = "header">
          <header>Get a Quote Today!</header>
      </div>
      <div className = "quoteSection">
          <div className = "actualQuote">{quote}</div> 
          <div className = "author">--{author}--</div>
      </div>
          <button className = "button" onClick = {getQuote}>Click to get a new quote</button>
    </div>
  );
}

export default App;
