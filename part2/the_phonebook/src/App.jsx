import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

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

const Persons = ({persons, onRemove}) => (
  <div>
    {persons.map(person => <Person key={person.name} person={person} onRemove={onRemove}/>)}
  </div>
)

const Person = ({person, onRemove}) => <div>{person.name} {person.number} <DeleteButton onClick={() => onRemove(person)}/></div>

const DeleteButton = ({onClick}) => <button onClick={onClick}>delete</button>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [textFilter, setTextFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    
    const newPerson = {name: newName, number: newNumber} //, id: `${persons.length+1}`} // Let id be decided automatically

    // Check if person already exists in phonebook
    if (persons.find((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find((person) => person.name === newName).id

        personService
        .update(id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === id ? returnedPerson : person))
          setNewName('')
          setNewNumber('')
          setMessage( `Updated ${newPerson.name}` )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    } else { // If a person with the same name does not exist, add them

      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage( `Added ${newPerson.name}` )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
  
  // Function for filtering person list
  const filterPersons = (persons, textFilter) => {
    const persons_filtered = persons.filter((person) => person.name.toLowerCase().indexOf(textFilter.toLowerCase()) != -1)
    // console.log('Rendered persons are', persons_filtered)
    return (
      persons_filtered
    )
  }

  // Function for deleting a Person
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log(`Deleting person with name ${person.name}`)

      // Remove person from server
      personService
      .remove(person.id)
      
      // Remove the person from the persons state
      const newPersons = persons.filter((p) => p.id != person.id)
      setPersons(newPersons)
    }

  }

  // Filter person list baased on the text filter
  const persons_show = filterPersons(persons, textFilter)

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={message} />

      <Filter textFilter={textFilter} onChange={handleTextFilter}/>

      <h2>add a new</h2>

      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>

      <h2>Numbers</h2>

      <Persons persons={persons_show} onRemove={deletePerson}/> 

    </div>
  )
}

export default App
