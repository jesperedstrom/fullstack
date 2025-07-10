import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const n = good+neutral+bad

  const Average = () => {
    if (n==0) {
      return 0 //Avoid division by zero
    } else {
      return (good-bad)/n
    }
  }
  
  const Positive = () => {
    if (n==0) {
      return 0 //Avoid division by zero
    } else {
      return good*100/n
    }
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={()=>setGood(good+1)} text='good'/>
      <Button onClick={()=>setNeutral(neutral+1)} text='neutral'/>
      <Button onClick={()=>setBad(bad+1)} text='bad'/>

      <h1>statistics</h1>

      <p>
        good {good}<br/>
        neutral {neutral}<br/>
        bad {bad}<br/>
        average {Average(n)}<br/>
        positive {Positive(n)} %
      </p>

    </div>
  )
}

export default App
