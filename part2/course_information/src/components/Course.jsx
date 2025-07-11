const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => {
  console.log(props)

  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><b>total of {props.total} exercises</b></p>

const Course = ({course}) => {

  // Compute sum of exercises using reduce
  const total = course.parts.map(part => part.exercises).reduce((sum, exercise) => sum + exercise, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total}
      />    
    </div>
  )
}

export default Course
