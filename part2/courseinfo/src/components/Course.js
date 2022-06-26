import React from 'react'

const Header = ({ course }) => (
    <h2 key={course.id}>{course.name}</h2>
)

const Content = ({ parts }) => (
	<div>
		{parts.map(part =>
			<p key={part.id}>{part.name} {part.exercises}</p>
		)}
	</div>
)

const Total = ({ parts }) => {
	const exercises = parts.map(part => part.exercises)
	
	const initialValue = 0
	const total = exercises.reduce(
		(previousValue, currentValue) => previousValue + currentValue,
		initialValue
	)
	return <div><b>total of {total} exercises</b></div>
}
  
const Course = ({ courses }) => (
	<div>
		{courses.map(course => 
			<div key={course.id}>
                <Header course={course} />
				<Content parts={course.parts} />
				<Total parts={course.parts} />
			</div>
		)}
	</div>
)

export default Course