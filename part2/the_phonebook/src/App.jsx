import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({textFilter, onChange}) => (
  <form>
    <div>
      filter shown with:<input value={textFilter} onChange={onChange}/>
    </div>
  </form>
)

const PersonForm = ({onSubmit, newName, newNumber, handleNewName, handleNewNumber}) => (
  
  <form onSubmit={onSubmit}>
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
)

const Persons = ({persons}) => (
  <div>
    {persons.map(person => <Person key={person.name} person={person}/>)}
  </div>
)

const Person = ({person}) => <div>{person.name} {person.number}</div>

// Function for filtering person list
const filterPersons = (persons, textFilter) => {
  const persons_filtered = persons.filter((person) => person.name.toLowerCase().indexOf(textFilter.toLowerCase()) != -1)
  // console.log('Rendered persons are', persons_filtered)

  return (
    persons_filtered
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [textFilter, setTextFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addName = (event) => {
    event.preventDefault()

    // Check if person already exists in phonebook
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else { // If a person with the same name does not exist, add them
      const nameObject = {name: newName, number: newNumber, id: `${persons.length+1}`} // id as string to be consistent with given data

      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleTextFilter = (event) => {
    setTextFilter(event.target.value)
  }

  // Filter person list baased on the text filter
  const persons_show = filterPersons(persons, textFilter)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter textFilter={textFilter} onChange={handleTextFilter}/>

      <h2>add a new</h2>

      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>

      <h2>Numbers</h2>

      <Persons persons={persons_show}/> 

    </div>
  )
}

export default App
