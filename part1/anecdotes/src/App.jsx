import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const ShowMostVotes = ({votes, anecdotes}) => {
  const argmax = votes.indexOf(Math.max(...votes));

  return (
    <p>
      {anecdotes[argmax]}<br/>
      has {votes[argmax]} votes
    </p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Number of anecdotes
  const n_anecdotes = anecdotes.length
  
  const [selected, setSelected] = useState(0)
  const [votes, addVote] = useState(Array(n_anecdotes).fill(0))

  // Function to call when clicking button
  const nextAnecdote = () =>{
     // Index of random anecdote
    const randint = Math.floor(Math.random() * n_anecdotes)
    console.log(randint) 

    // Update state
    setSelected(randint)
  }

  const handleVote = () => {
    // Create copy of votes array and increment the value in position selected by one
    const copy = [...votes]
    copy[selected] += 1 

    // Update votes state
    addVote(copy)

    console.log(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes <br/>
      <Button onClick={handleVote} text='vote'/>
      <Button onClick={nextAnecdote} text='next anecdote'/>

      <h1>Anecdote with most votes</h1>
      <ShowMostVotes votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
