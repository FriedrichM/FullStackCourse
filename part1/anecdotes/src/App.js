import React, { useState } from 'react'



const App = () => {


  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)

  const handleNext = ()=>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = ()=>{
    const copy = [...points]
    // increment the value in position 2 by one
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
        {anecdotes[selected]} has {points[selected]} votes
        <br/>
        <button onClick={handleNext}>
          next anecdote
        </button>
        <button onClick={handleVote}>
          vote
        </button>
        <h1>Anecdote with most votes</h1>
        {anecdotes[points.indexOf(Math.max.apply(Math, points))]} has {Math.max(...points)} votes

    </div>
  )
}

export default App
