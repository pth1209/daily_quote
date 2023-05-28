import './App.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"

function App() {

  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [button, setButton] = useState(true)
  const [buttonClicked, setButtonClicked] = useState(false)

  const getQuote = () => {
    axios
      .get("https://api.quotable.io/random")
      .then(response => {
        console.log(response.data)
        setQuote(response.data.content)
        setAuthor(response.data.author)
        localStorage.setItem("lastClickedDate", getTodayDate())
      })
      .catch((error) => {
        console.log(error)
      })
    }

  const checkClicked = () => {
    setButtonClicked(true)
  }

  //useEffect will be executed whenever buttonClicked state changes
  useEffect(() => {
    if (buttonClicked) {
      getQuote()
      setButtonClicked(false)
    }
  }, [buttonClicked])

  useEffect(() => {
    const lastClickedDate = localStorage.getItem("lastClickedDate")
    if (lastClickedDate == getTodayDate()) {
      setButton(false)
    }
  })

  const getTodayDate = () => {
    const date = new Date()
    return date.toISOString().split("T")[0]
  }

  return (
    <div className="App">
      <div className = "header">
          <header>Get a Quote Today!</header>
      </div>
      <div className = "quoteSection">
        {!button ? (
          <>
          <div className = "actualQuote">{quote}</div> 
          <div className = "author">--{author}--</div>
          </>
        ) : (
          <>
          <div className = "placeHolder"></div>
          </>
        )}
      </div>
      {button && (
         <button className = "button" onClick = {checkClicked}>Click to get a new quote</button>
      )}
      <div className = "bottom">
        <a class = "link"href = "https://github.com/pth1209/daily_quote_generator.git">Source Code!</a>
      </div>

    </div>
  );
}

export default App;
