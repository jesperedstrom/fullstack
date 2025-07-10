import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  console.log(text, value)
  return (
    <span>{text} {value}</span>
  )
}

const round = (num) => Math.round(num * 10) / 10;

const Statistics = ({good, neutral, bad}) => {
  
  const n = good+neutral+bad  
  
  if (n===0) { //If no feedback has been received (n=0)
    return (
      <p>
        No feedback given
      </p>
    )
  } else {
    return (
    <div>
      <StatisticLine text='good' value={good}/><br/>
      <StatisticLine text='neutral' value={neutral}/><br/>
      <StatisticLine text='bad' value={bad}/><br/>
      <StatisticLine text='all' value={n}/><br/>
      <StatisticLine text='average' value={round(good-bad/n)}/><br/>
      <StatisticLine text='positive' value={round(good*100/n)}/> <span> %</span> 
    </div>
    )
  }
}

const Statistics_table = ({good, neutral, bad}) => {
  
  const n = good+neutral+bad  
  
  if (n===0) { //If no feedback has been received (n=0)
    return (
      <p>
        No feedback given 
      </p>
    )
  } else {
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{n}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{round((good-bad)/n)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{round(good*100/n)} <span>%</span></td>
          </tr>
        </tbody>
      </table>
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

      <Statistics_table good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App
