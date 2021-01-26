import React, { useState } from 'react'

const Statistic = (props) =>(<>
  <tr>
    <td>{props.text}</td><td>{props.value}</td>
  </tr>
</>)

const Statistics = ({good,neutral,bad}) => {
  if((good+bad+neutral)===0){
    return (<div>
      <p>
        No feedback given
      </p>
    </div>)
  }
  return(

    <div>
      <table>
        <tbody>
          <Statistic text="good" value ={good} />
          <Statistic text="neutral" value ={neutral} />
          <Statistic text="bad" value ={bad} />
          <Statistic text="all" value ={good+neutral+bad} />
          <Statistic text="average" value ={(good-bad)/(good+neutral+bad)} />
          <Statistic text="positive" value ={(good/(good+neutral+bad)*100)+"%"} />
        </tbody>
      </table>
    </div>
  )

}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
      <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>

      <h1>Statisics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    )
}

export default App
