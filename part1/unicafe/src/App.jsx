import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  console.log(text, value)
  return (
    <span>{text} {value}</span>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  const n = good+neutral+bad  
  
  if (n===0) {
    return (
      <p>
        No feedback given
      </p>
    ) //Avoid division by zero
  } else {
    return (
    <div>
      <StatisticLine text='good' value={good}/><br/>
      <StatisticLine text='neutral' value={neutral}/><br/>
      <StatisticLine text='bad' value={bad}/><br/>
      <StatisticLine text='all' value={n}/><br/>
      <StatisticLine text='average' value={(good-bad)/n}/><br/>
      <StatisticLine text='positive' value={good*100/n}/> <span> %</span> 
    </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={()=>setGood(good+1)} text='good'/>
      <Button onClick={()=>setNeutral(neutral+1)} text='neutral'/>
      <Button onClick={()=>setBad(bad+1)} text='bad'/>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App
