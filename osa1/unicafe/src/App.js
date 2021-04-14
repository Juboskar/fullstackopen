import React, { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad == 0) {
    return (
      <>
        <p>no feedback given</p>
      </>
    )
  }
  else {
    return (
      <table>
        <StatisticsLine text={'good'} value={good} />
        <StatisticsLine text={'neutral'} value={neutral} />
        <StatisticsLine text={'bad'} value={bad} />
        <StatisticsLine text={'all'} value={good - bad} />
        <StatisticsLine text={'average'} value={(good - bad) / (good + neutral + bad)} />
        <StatisticsLine text={'positive'} value={(good / (good + neutral + bad) * 100) + '%'} />
      </table>
    )
  }
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

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App