import { useState } from 'react'

const Person = ({person}) => <div>{person.name} {person.number}</div>

const filterPersons = (persons, textFilter) => {
  const persons_filtered = persons.filter((person) => person.name.toLowerCase().indexOf(textFilter.toLowerCase()) != -1)
  console.log(persons_filtered)

  return (
    persons_filtered
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [textFilter, setTextFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {name: newName, number: newNumber, id: persons.length+1}
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleTextFilter = (event) => {
    console.log(event.target.value)
    setTextFilter(event.target.value)
  }

  const persons_show = filterPersons(persons, textFilter)

  return (
    <div>
      <h2>Phonebook</h2>
        <form>
          <div>
            filter shown with:<input value={textFilter} onChange={handleTextFilter}/>
          </div>
        </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons_show.map(person => 
        <Person key={person.name} person={person}/>)}
    </div>
  )
}

export default App
