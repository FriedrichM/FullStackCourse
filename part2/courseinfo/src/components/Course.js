import React from 'react'

const Header = ({name}) =>(<>
  <h2>{name}</h2>
</>)



const Part = ({part}) =>(<>
  <p>
    {part.name} {part.exercises}
  </p>
</>)

const Content = ({parts}) =>(
  <>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </>)

const Total = ({parts}) =>{
  return(<>
    <h3>total of {parts.reduce((s, p) => {return s+p.exercises},0)} exercises</h3>
  </>)
}

const Course = ({course}) =>(
  <>
  <Header name={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
  </>
)

export default Course
