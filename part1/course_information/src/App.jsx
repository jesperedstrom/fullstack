const App_step2 = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total total={exercises1+exercises2+exercises3} />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises} />
      <Total total={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
      <div>
        <h1>{props.course}</h1>
      </div>
  )
}

const Content_step1 = (props) => {
  console.log(props)
  return (
      <div>
        <p>
          {props.part1} {props.exercises1}
        </p>
        <p>
          {props.part2} {props.exercises2}
        </p>
        <p>
          {props.part3} {props.exercises3}
        </p>
      </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} excercise={props.exercises1}/>
      <Part part={props.part2} excercise={props.exercises2}/>
      <Part part={props.part3} excercise={props.exercises3}/>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.part} {props.excercise}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

export default App
