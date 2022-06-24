import { useState } from 'react'

const Button = ({ onClick, text} ) => (
	<button onClick={onClick}>
		{text}
	</button>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
	if (all === 0) {
		return (
			<div>No feedback given</div>
		)
	}
	return (
		<div>
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
						<td>{all}</td>
					</tr>
					<tr>
						<td>average</td>
						<td>{average}</td>
					</tr>
					<tr>
						<td>positive</td>
						<td>{positive}%</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
	const all = good + neutral + bad
	const average = (good - bad)/all
	const positive = (good / all) * 100
	
	const handleGoodClick = () => {
		setGood(good + 1)
		console.log('good clicked')
	}
	
	const handleNeutralClick = () => {
		setNeutral(neutral + 1)
		console.log('neutral clicked')
	}
	
	const handleBadClick = () => {
		setBad(bad + 1)
		console.log('bad clicked')
	}
	
  return (
    <div>
		<h1>give feedback</h1>
		<Button onClick={handleGoodClick} text='good' />
		<Button onClick={handleNeutralClick} text='neutral' />
		<Button onClick={handleBadClick} text='bad' />
		
		<h1>statistics</h1>
		<Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App